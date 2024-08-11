import userIcon from "@/assets/icon/icon-user.png";
import Image from "next/image";
import { useState } from "react";

interface UserPostProps {
  onPost: (content: string) => void;
}

export function UserPost(props: UserPostProps) {
  const { onPost } = props;
  const [content, setContet] = useState<string>("");
  const onPostClick = () => {
    onPost(content);
    setContet("");
  };

  return (
    <>
      <div className="flex flex-col border border-slate-400 p-3 m-3  bg-mocca rounded-md">
        <div className="flex gap-3">
          <div className="flex justify-center items-start">
            <Image
              src={userIcon}
              alt="User icon"
              width={50}
              height={50}
            ></Image>
          </div>
          <input
            type="text"
            placeholder="What is happening?"
            className="p-3 bg-transparent"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onPostClick}
            className="rounded-md bg-leaf p-1 px-6 my-3 text-white font-medium"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
}
