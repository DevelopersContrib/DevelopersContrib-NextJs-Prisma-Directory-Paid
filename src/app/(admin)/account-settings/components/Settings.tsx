import React from "react";
import MainContent from "./MainContent";
import Sidebar from "@/components/sidebar/sidebar";
import prismadb from "@/lib/prismaDb";
import { authOptions } from "@/lib/utils/auth-options";
import SessionType from "@/types/session.type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getDomain, getData } from "@/lib/data";
import CategoryType from "@/types/category.type";
import { LinkType } from "@/types/link.type";
import { IAccountInfo } from "@/interfaces/auth.interface";
import {getAccountInfo} from "@/actions/auth.action";
import { INotification } from "@/interfaces/notification.interface";

const Settings = async () => {
  const session: SessionType = await getServerSession(authOptions);
  if (!session) redirect("/");

  const c = await getData();
  const domain = getDomain();
  
  const accountInfo = await getAccountInfo(session?.user.userId);

  const account = {
    id:accountInfo?.id,
    name:accountInfo?.name,
    email:accountInfo?.email,
    password:accountInfo?.password,
    old_email:accountInfo?.email
  } as IAccountInfo;

  const notification = {
    id:accountInfo?.id,
    receive_email:accountInfo?.receive_email,
    receive_newsletter:accountInfo?.receive_newsletter
  } as INotification;

  const paymentAlreadyExists = await prismadb.payment.findFirst({
    where: {
      userId: session.user.userId,
    },
  });

  if (!paymentAlreadyExists) redirect("/checkout");

  const categories: CategoryType[] = await prismadb.category.findMany({
    orderBy: {
      category_name: "asc",
    },
  });

  const recents: LinkType[] = await prismadb.link.findMany({
    where: {
      userId: session.user.userId,
      archivedAt: null,
    },
    include: {
      category: {
        select: {
          category_name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  return (
    <>
      <main className="flex">
        <Sidebar
          recents={recents}
          categories={categories}
          userId={session.user.userId}
          domain={domain}
          logo={c.data.logo}
        />

        <MainContent accountInfo={account} notification={notification}/>
      </main>
    </>
  );
};

export default Settings;
