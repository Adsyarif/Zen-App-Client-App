import userIcon from "@/assets/icon/icon-user.png";
import Image from "next/image";
import { useState } from "react";

interface UserReplyProps{
    onReply: (content: string) => void;
}

export function UserReply({onReply}: UserReplyProps) {
    const [content, setContent] = useState<string>("");

    const onCommentClick = () => {
        if (content.trim()) {
          onReply(content);
          setContent("");
        } else {
          alert("Post content cannot be empty.");
        }
      };

    return(
        <>
        <div className="flex flex-col border w-full border-slate-400 p-3  bg-mocca rounded-md">
            <div className="flex gap-3">
                <div className="flex justify-center items-start">
                <Image
                    src={userIcon}
                    alt="User icon"
                    width={50}
                    height={50}
                />
                </div>
                <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What is happening?"
                className="p-3 bg-transparent w-full"
                />
            </div>
            <div className="flex justify-end">
                <button
                onClick={onCommentClick}
                className="rounded-md bg-leaf p-1 px-6 my-3 text-white font-medium"
                >
                Reply Post
                </button>
            </div>
        </div>
        </>
    )
}