import React, { useState } from "react";
import Image from "next/image";
import userIcon from "@/assets/icon/icon-user.png";
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoMdMore } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

export interface ReportCategory {
  report_category_id: number;
  value: string;
}

export interface PostReplyProps {
  postContent: string;
  username: string;
  post_id: string;
  commentCount?: number; 
  bookmarkCount?: number; 
  likeCount?: number; 
  isLiked: boolean;
  isBookmark: boolean;
  onReportPost: (postId: string, categoryId: number) => void;
  onLikeToggle: (postId: string, isLiked: boolean) => void;
  onBookmarkToggle: (postId: string, isBookmark: boolean) => void;
  reportCategories: ReportCategory[];

  onDeletePost?: (postId: string) => void;
  isCurrentUserPost?: boolean;
}

export function Comment({
  postContent,
  username,
  post_id,
  commentCount = 0,
  bookmarkCount = 0,
  likeCount = 0,
  isLiked,
  isBookmark,
  onReportPost,
  onLikeToggle,
  onBookmarkToggle,
  reportCategories,

  onDeletePost,
  isCurrentUserPost = false,
}: PostReplyProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReport = (categoryId: number) => {
    onReportPost(post_id, categoryId);
    handleClose();
  };

  const handleLikeClick = () => {
    onLikeToggle(post_id, isLiked);
  };

  const handleBookmarkClick = () => {
    onBookmarkToggle(post_id, isBookmark);
  };

  const handleDeleteClick = () => {
    if (onDeletePost) {
      onDeletePost(post_id);
    }
    handleClose();
  };

  return (
    <div className="flex justify-center flex-col gap-3 border border-slate-400 p-3  w-full rounded-md ">
      <div className="flex gap-3">
        <div className="flex justify-center items-start">
          <Image src={userIcon} alt="User icon" height={50} width={50} />
        </div>

        <div className=" ">
          <h3 className="my-2 font-medium">{username}</h3>
          <p>{postContent}</p>
        </div>

        <div className="flex items-start justify-end ml-auto">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <IoMdMore />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                backgroundColor: "#FAF6E3",
                width: "fit-content",
              },
            }}
          >
            {!isCurrentUserPost && (
                <MenuItem>
                  <span className="text-center w-full text-leaf font-semibold text-[32px] ">
                      Report List
                  </span>
                </MenuItem> 
              )
            }
            
            {reportCategories.map((category) => (
              <MenuItem
                key={category.report_category_id}
                style={{ color: "#FFFFFF", background:"#22543D", margin:"10px", borderRadius:"5px" }}
                onClick={() => handleReport(category.report_category_id)}
              >
                {category.value}
              </MenuItem>
            ))}
            
            {isCurrentUserPost && (
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            )}

          </Menu>
        </div>

      </div>
      <div className="flex justify-end gap-4">
        <div className="flex gap-1 items-center">
          <FaRegComment size={20} />
          <p>{commentCount}</p>
        </div>

        <div className="flex gap-1 items-center cursor-pointer " onClick={handleBookmarkClick}>
          {isBookmark ? <FaBookmark size={20}/> : <FaRegBookmark size={20} />}
          <p>{bookmarkCount}</p>
        </div>

        <div className="flex gap-1 items-center cursor-pointer" onClick={handleLikeClick}>
          {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          <p>{likeCount}</p>
        </div>

      </div>
    </div>
  );
}