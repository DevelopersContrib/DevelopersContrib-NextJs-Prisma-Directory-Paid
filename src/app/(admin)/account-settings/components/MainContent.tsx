"use client";
import React, { useState} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import { Toast } from "@/components/ui/toast";
import AccountInfo from "@/app/(admin)/account-settings/components/AccountInfo"
import { deleteAction, notificationAction } from "@/actions/accountInfo.actions";
import { IAccountInfo } from "@/interfaces/auth.interface";
import { INotification } from "@/interfaces/notification.interface";
import { signOut } from "next-auth/react";

const FormSchema = z.object({
  receive_email: z.boolean().default(false).optional(),
  receive_newsletter: z.boolean(),
});

type Props = {
  accountInfo: IAccountInfo;
  notification: INotification;
};

type Errors = {
  [key: string]: string | undefined;
} | null;

const MainContent = ({ accountInfo,notification }: Props) => {
  const [errors, setErrors] = useState<Errors>(null);
  const [isMutation, setIsMutation] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

  const [notificationSuccess, setNotificationSuccess] = useState<boolean>(false); 

  const logoutHandler = () => {
    signOut();
  };

  const handleDeleteAccount = async () => {
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed.isConfirmed) {
      const res = await deleteAction(accountInfo.id);
      if (res.message === "Account not found.") {
        setErrors({ account: "Account not found." });
      } else if (res.message === "Account deleted successfully") {
        
        setDeleteSuccess(true); // Set success state
        // Optionally, you can reset the form here if desired
        // e.g., e.target.reset(); if you pass the event to clientAction
      }
      Swal.fire({
        title: "Deleted!",
        text: "Your account has been deleted.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        logoutHandler();
      });
      
    } else {
      Swal.fire({
        title: "Cancelled",
        text: "Your account is safe.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
      });
    }
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      receive_email: notification.receive_email,
      receive_newsletter: notification.receive_newsletter,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
    const noti = {
      id:accountInfo.id,
      receive_email:data.receive_email,
      receive_newsletter:data.receive_newsletter
    } as INotification;
    const res = await notificationAction(noti);
    if (res.message === "Account not found.") {
      setErrors({ account: "Account not found." });
    } else if (res.message === "Notification successfully") {
      setNotificationSuccess(true);
    }
    Swal.fire({
      title: "Notification",
      text: "Notification successfully saved.",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      
    });
  }

  
  return (
    <>
      <div className="p-[50px] flex flex-col gap-y-8 w-full">
        <h1 className="font-sans text-4xl font-semibold text-center text-primary mb">
          Account Settings
        </h1>
        <Tabs defaultValue="accountInformation" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accountInformation">
              Account Information
            </TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="deleteAccount">Delete Account</TabsTrigger>
          </TabsList>
          <TabsContent value="accountInformation">
            <AccountInfo accountInfo={accountInfo} />
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Manage your email and notification preferences:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="receive_email"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Emails Alerts</FormLabel>
                                <FormDescription>
                                  Receive notifications when your links are
                                  live, or when they receive upvotes.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="receive_newsletter"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                              <div className="space-y-0.5">
                                <FormLabel>Newsletter</FormLabel>
                                <FormDescription>
                                  Get updates about new features, tips, and
                                  directory news.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <Button>Save changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="deleteAccount">
            <Card>
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant={"destructive"} onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MainContent;
