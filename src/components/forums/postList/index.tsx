import Image from "next/image";
import userIcon from "@/assets/icon/icon-user.png";
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

export interface PostListProps {
  postContent: string;
  username: string;
  commentCount: number;
  bookmarkCount: number;
  likeCount: number;
}

export function PostList(props: PostListProps) {
  const { postContent, username, commentCount, bookmarkCount, likeCount } =
    props;
  return (
    <>
      <div className="flex flex-col gap-3 border border-slate-400 p-3 m-3 bg-mocca rounded-md">
        <div className="flex gap-3">
          <div className="flex justify-center items-start">
            <Image src={userIcon} alt="User icon" height={50} width={50} />
          </div>
          <div className="w-4/5">
            <h3 className="my-2 font-medium">{username}</h3>
            <p>{postContent}</p>
          </div>
        </div>
        <div
          className="flex justify-end gap-4
        "
        >
          <div className="flex gap-1 items-center">
            <FaRegComment />
            <span>{commentCount}</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <FaRegBookmark />
            <span>{bookmarkCount}</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <AiOutlineLike />
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </>
  );
}
