import React from "react";
import Link from "next/link";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";

const NotifBarOnDesktop = () => {
  return (
    <>
      <div className="hidden lg:flex gap-3 text-white w-full font-semibold justify-around text-2xl py-3">
        <Link href={"/Profile/post"}>
          <FaRegComment />
        </Link>
        <Link href={"/Profile/bookmark"}>
          <FaRegBookmark />
        </Link>
        <Link href={"/Profile/like"}>
          <AiOutlineLike />
        </Link>
        <Link href={"/Profile/notification"}>
          <IoNotificationsOutline />
        </Link>
      </div>
    </>
  );
};

export default NotifBarOnDesktop;
