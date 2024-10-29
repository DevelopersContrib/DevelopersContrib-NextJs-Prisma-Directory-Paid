import React from "react";
import Sidebar from "@/components/sidebar/sidebar";
import prismadb from "@/lib/prismaDb";
import { authOptions } from "@/lib/utils/auth-options";
import SessionType from "@/types/session.type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getDomain, getData } from "@/lib/data";
import CategoryType from "@/types/category.type";
import { LinkType } from "@/types/link.type";
import { PaymentType } from "@/types/payment.type";
import Main from "./Main";

const page = async () => {
  const session: SessionType = await getServerSession(authOptions);
  if (!session) redirect("/");

  const c = await getData();
  const domain = getDomain();

  const categories: CategoryType[] = await prismadb.category.findMany({
    orderBy: {
      category_name: "asc",
    },
  });

  const payments: PaymentType[] = await prismadb.payment.findMany({
    where: {
      userId: session.user.userId,
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
    <main className="flex">
      <Sidebar
        isAdmin={session.user.isAdmin}
        recents={recents}
        categories={categories}
        userId={session.user.userId}
        domain={domain}
        logo={c.data.logo}
      />
      <Main recents={payments}/>
    </main>
  );
};

export default page;