"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { likeAction, countLikesAction } from "@/actions/like.action";
import { unlikeAction, countUnlikesAction } from "@/actions/unlike.action";
import { historyAction } from "@/actions/history.action";
import { toast } from "sonner";

type Props = {
  id: string;
};
import { BiDislike, BiLike } from "react-icons/bi";

const Likes = ({ id }: Props) => {

    const [likes, setLikes] = useState<number>(0);
    const [unlikes, setUnlikes] = useState<number>(0);
    const [isMutation, setIsMutation] = useState<boolean>(false);
    const [isUnlikeMutation, setUnlikeMutation] = useState<boolean>(false);

    useEffect(() => {
        const fetchLikes = async () => {
            const res = await countLikesAction(id,'/');
            if (res.data !=null) {
                setLikes(res.data);
            }
        };

        const fetchUnlikes = async () => {
            const res = await countUnlikesAction(id,'/');
            if (res.data !=null) {
                setUnlikes(res.data);
            }
        };

        fetchLikes();
        fetchUnlikes();
    }, []);

    const clientAction = async () => {
        if (isMutation) return null;
        setIsMutation(true);

        try {
            const res = await likeAction({
                LinkId: id,
                userId: '8c903015-2300-4dad-b4bd-db1ed4b43508',
                path: '/',
            });
            if (res.message === "Like created successfully") {
                setLikes(likes + 1);
            }
        } catch (error) {
            console.info("[ERROR_CLIENT_ACTION]", error);

            toast("Something went wrong");
        } finally {
            setIsMutation(false);
        }
    };

    const clientUnlikeAction = async () => {
        if (isUnlikeMutation) return null;
        setUnlikeMutation(true);

        try {
            const res = await unlikeAction({
                LinkId: id,
                userId: '8c903015-2300-4dad-b4bd-db1ed4b43508',
                path: '/',
            });
            if (res.message === "Unlike created successfully") {
                setUnlikes(unlikes + 1);
            }
        } catch (error) {
            console.info("[ERROR_CLIENT_ACTION]", error);

            toast("Something went wrong");
        } finally {
            setUnlikeMutation(false);
        }
    };

  return (
    <>
      
              <div className="w-full flex justify-center space-x-2 pb-4 mt-auto">
                <Button variant={"secondary"} className="flex" onClick={clientAction} disabled={isMutation}>
                  <span className="mr-1">
                    <BiLike />
                  </span>
                  <span className="">{likes}</span>
                </Button>
                <Button variant={"secondary"} className="flex" onClick={clientUnlikeAction} disabled={isUnlikeMutation}>
                  <span className="mr-1">
                    <BiDislike />
                  </span>
                  <span className="">{unlikes}</span>
                </Button>
              </div>
             
        
      
    </>
  );
};

export default Likes;
