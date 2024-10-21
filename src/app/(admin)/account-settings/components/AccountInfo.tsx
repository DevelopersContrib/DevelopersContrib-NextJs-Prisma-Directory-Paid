"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accountInfoSchema } from "@/validations/auth.validation";
import { accountInfoAction } from "@/actions/accountInfo.actions";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";

import { IAccountInfo } from "@/interfaces/auth.interface";

type Errors = {
    [key: string]: string | undefined;
} | null;


type Props = {
    accountInfo: IAccountInfo;
};
  

const AccountInfo =  ({ accountInfo }: Props) => {
    const [errors, setErrors] = useState<Errors>(null);
    const [isMutation, setIsMutation] = useState<boolean>(false);
    const [accountInfoSuccess, setAccountInfoSuccess] = useState<boolean>(false); // New state
    
    const [fData, setFData] = useState<IAccountInfo>({
        id: "",
        email: "",
        name: "",
        password: "",
        old_email:""
      });

    useEffect(() => {
        setFData({
            id: accountInfo?.id || "",
            email: accountInfo?.email || "",
            name: accountInfo?.name || "",
            password:  "",
            old_email:accountInfo?.email || "",
        });
    }, [accountInfo]);
    
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
        setFData({
          ...fData,
          [name]: value,
        });
      };

    const clientAction = async (formData: FormData) => {
        if (isMutation) return; // Prevent multiple submissions
        setIsMutation(true);
    
        try {
          const data = {
            id: accountInfo.id,
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            old_email: accountInfo.email as string
          };
    
          const validations = accountInfoSchema.safeParse(data);
          if (!validations.success) {
            const newErrors: Errors = {};
            validations.error.issues.forEach((issue) => {
              newErrors[issue.path[0]] = issue.message;
            });
    
            setErrors(newErrors);
            return;
          }
    
          setErrors(null); // Clear previous errors if any
          
          const res = await accountInfoAction(data);
          if (res.message === "Email already exists") {
            setErrors({ email: "Email already exists" });
          } else if (res.message === "Account updated successfully") {
            const userId = res.id?.toString();
            
            setAccountInfoSuccess(true); // Set success state
            // Optionally, you can reset the form here if desired
            // e.g., e.target.reset(); if you pass the event to clientAction
          }
        } catch (error) {
          console.error("[ERROR_CLIENT_ACTION]", error);
          toast("Something went wrong");
        } finally {
          setIsMutation(false); // Reset loading state after completion
        }
      };

    return(
        <Card>
            <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
                Make changes to your account here. Click save when you're
                done.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {accountInfoSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                    <span className="block sm:inline">
                        Update successful!
                    </span>
                    </div>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        clientAction(formData);
                    }}
                    className="flex flex-col gap-y-5"
                    >
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={fData.name} onChange={handleChange} className={`input ${errors?.name ? "input-error" : ""}`} />
                        {errors?.name && (<p className="text-red-500 font-sans">{errors?.name}</p>)}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" value={fData.email} onChange={handleChange} className={`input ${errors?.email ? "input-error" : ""}`} />
                        {errors?.email && (<p className="text-red-500 font-sans">{errors?.email}</p>)}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" value={fData.password} onChange={handleChange} type="password" className={`input ${errors?.password ? "input-error" : ""}`} />
                        {errors?.password && (<p className="text-red-500 font-sans">{errors?.password}</p>)}
                    </div>
                    <div className="space-y-1">
                    <Button>Save changes</Button>
                    </div>
                </form>
            </CardContent>
            
        </Card>
    );
};

export default AccountInfo;