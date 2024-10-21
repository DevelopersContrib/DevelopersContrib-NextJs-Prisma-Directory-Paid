import React from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Main from "@/components/main/main";
import prismadb from "@/lib/prismaDb";
import { authOptions } from "@/lib/utils/auth-options";
import FolderType from "@/types/folder.type";
import PostType from "@/types/post.type";
import SessionType from "@/types/session.type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getDomain, getData } from "@/lib/data";
import CategoryType from "@/types/category.type";
import { LinkType } from "@/types/link.type";
import CreateListing from "../components/CreateListing";

const page = async () => {
  const session: SessionType = await getServerSession(authOptions);
  if (!session) redirect("/");

  const c = await getData();
  const domain = getDomain();

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

  const recentsWithCounts = await Promise.all(
    recents.map(async (recent) => {
      const countLike = await prismadb.linkVotesUp.count({
        where: { LinkId: recent.id },
      });

      const countClick = await prismadb.linkClicks.count({
        where: { LinkId: recent.id },
      });

      const countUnlike = await prismadb.linkVotesDown.count({
        where: { LinkId: recent.id },
      });

      return { ...recent, countLike, countClick, countUnlike };
    })
  );
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

        <CreateListing categories={categories} userId={session.user.userId} />
      </main>
    </>
  );
};

export default page;
