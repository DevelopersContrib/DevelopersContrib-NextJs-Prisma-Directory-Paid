"use client";

import {
  updatePostArchivedAtAction,
  updatePostDeletedAtAction,
  updatePostFavoritedAtAction,
} from "@/actions/post.action";
import { useRouter } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  useTransition,
  MouseEvent,
} from "react";
import { FaRegStar } from "react-icons/fa6";
import { FiArchive, FiTrash } from "react-icons/fi";
import { GoStarFill } from "react-icons/go";
import { toast } from "sonner";

type Props = {
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
  postId: string | null;
  favoritedAt: Date | null;
  archivedAt: Date | null;
};

const Menu = ({ setOpenMenu, postId, favoritedAt, archivedAt }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const closeMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    setOpenMenu(false);
  };

  const deleted = async () => {
    if (!postId || isPending) return null;

    try {
      startTransition(() => {
        updatePostDeletedAtAction({ postId, path: window.location.pathname });
      });
    } catch (error) {
      console.info("[ERROR_DELETED]", error);

      toast.error("Something went wrong.");
    }
  };

  const favorited = async () => {
    if (!postId || isPending) return null;

    try {
      startTransition(() => {
        updatePostFavoritedAtAction({ postId, path: window.location.pathname });
      });
    } catch (error) {
      console.info("[ERROR_FAVORITED]", error);

      toast.error("Something went wrong.");
    }
  };

  const archived = async () => {
    if (!postId || isPending) return null;

    try {
      startTransition(async () => {
        const res = await updatePostArchivedAtAction({
          postId,
          path: window.location.pathname,
        });

        if (res.message === "Post unarchived successfully." && res.data) {
          router.push(
            `/?folderId=${res.data.folderId}&postId=${res.data.postId}`
          );
        }

        if (res.message === "Post archived successfully." && res.data) {
          router.push(`/?category=archived-notes&postId=${res.data.postId}`);
        }
      });
    } catch (error) {
      console.info("[ERROR_ARCHIVED]", error);

      toast.error("Something went wrong.");
    }
  };

  return (
    <div
      onClick={(e) => closeMenu(e)}
      className="absolute top-[44px] right-0 bg-[#333333] p-4 rounded-[6px] text-white w-[52px] flex flex-col gap-y-5"
    >
      <button
        onClick={favorited}
        disabled={isPending}
        className="flex items-center gap-x-4"
      >
        {favoritedAt ? (
          <GoStarFill className="w-5 h-5" />
        ) : (
          <FaRegStar className="w-5 h-5" />
        )}
        <h5 className="font-sans font-normal text-base">
          {favoritedAt ? "Unfavorited" : "Add to favorites"}
        </h5>
      </button>
      <button
        className="flex items-center gap-x-4"
        onClick={archived}
        disabled={isPending}
      >
        <FiArchive className="w-5 h-5" />
        <h5 className="font-sans font-normal text-base">
          {archivedAt ? "Unarchive" : "Add to archive"}
        </h5>
      </button>
      <div className="h-1 w-full bg-white/5" />
      <button
        className="flex items-center gap-x-4"
        disabled={isPending}
        onClick={deleted}
      >
        <FiTrash className="w-5 h-5" />
        <h5 className="font-sans font-normal text-base">Delete</h5>
      </button>
    </div>
  );
};

export default Menu;
