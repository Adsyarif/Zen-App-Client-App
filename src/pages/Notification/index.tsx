import { PostNotification, PostNotificationProps } from "@/components/forums/postNotification";
import { FetchUtil } from "@/lib";
import React from "react";
import { useState, useEffect } from "react";

export default function Notification() {
  const [posts, setPosts] = useState<PostNotificationProps[]>([]);

  const getAllPost = async () => {
    const posts = await FetchUtil({
      url: "/api/getallpostnotification",
    });
    setPosts(posts);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="flex flex-col bg-mocca lg:mx-24 justify-center items-center">
      <div className="bg-mocca w-full lg:w-3/5 px-5 md:px-20">
      <button className="rounded-md bg-leaf p-2 px-6 my-4 text-white font-medium">
        My Notification
      </button>
        {posts.map((prop, i) => (
          <PostNotification {...prop} key={i + "postNotification"} />
        ))}
      </div>
    </div>
  );
}
