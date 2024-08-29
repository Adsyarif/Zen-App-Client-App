import React from "react";
import Link from "next/link";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";

const NotifBarOnMobile = () => {
  return (
    <>
      <div className="lg:hidden flex gap-3 text-white font10-semibold justify-around text-2xl py-3 bg-darkGreen rounded-md">
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

export default NotifBarOnMobile;
