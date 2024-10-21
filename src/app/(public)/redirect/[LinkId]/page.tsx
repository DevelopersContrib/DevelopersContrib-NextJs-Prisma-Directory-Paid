import React from "react";
import prismadb from "@/lib/prismaDb";
import { authOptions } from "@/lib/utils/auth-options";
import FolderType from "@/types/folder.type";
import PostType from "@/types/post.type";
import { LinkType } from "@/types/link.type";
import SessionType from "@/types/session.type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getDomain, getData } from "@/lib/data";
import CategoryType from "@/types/category.type";
import { clickAction, countClicksAction } from "@/actions/click.action";

const Page = async ({ params }: { params: any }) => {
  const res = await clickAction({
    LinkId: params.LinkId,
    path: "/",
  });

  const post = await prismadb.link.findUnique({
    where: {
      id: params.LinkId,
    },
  });

  if (post?.url) redirect(post.url);
  if (!post) redirect("/");

  return <></>;
};

export default Page;
