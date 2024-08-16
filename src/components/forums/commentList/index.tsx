import Image from "next/image";
import userIcon from "@/assets/icon/icon-user.png";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoMdMore } from "react-icons/io";
import React, { useState } from "react";

export interface ReportCategory {
    report_category_id: number;
    value: string;
    
}

export interface CommentListProps {
    commentContent: string;
    username: string;
    comment_id: string;
    onReportComment: (postComment: string, categoryId: number) => void;
    reportCategories: ReportCategory[];

    onDeleteComment?: (postComment: string) => void;
    isCurrentUserComment?: boolean;

    isCurrentUserReport?: boolean;
}

export function CommentList({
    commentContent,
    username,
    comment_id,
    onReportComment,
    reportCategories,
    onDeleteComment,
    isCurrentUserComment = false,
    isCurrentUserReport = false,
}: CommentListProps) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleReport = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        onReportComment(comment_id, categoryId);
        handleClose();
    };

    const handleDeletecomment = () => {
        if (onDeleteComment) {
            onDeleteComment(comment_id);
        }
        handleClose();
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex flex-col gap-3 border border-slate-400 p-3 bg-mocca rounded-md w-full">
                <div className="flex gap-3">
                    <div className="flex justify-center items-start">
                        <Image src={userIcon} alt="User icon" height={25} width={25} />
                    </div>
                    <div className="w-4/5 md:text-xl">
                        <h3 className="my-2 font-medium">{username}</h3>
                        <p>{commentContent}</p>
                    </div>

                    <div className="flex items-start justify-end ml-auto">
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <IoMdMore />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    backgroundColor: '#FAF6E3',
                                    width: 'fit-content',
                                },
                            }}
                        >
                            {!isCurrentUserReport && (
                                <MenuItem>
                                    <span className="text-center w-full text-leaf font-semibold text-[32px] ">
                                        Report List
                                    </span>
                                </MenuItem> 
                            )
                            }
                            
                            {!isCurrentUserReport && reportCategories.map((category) => (
                                <MenuItem
                                    key={category.report_category_id}
                                    style={{ color: "#FFFFFF", background:"#22543D", margin:"10px", borderRadius:"5px" }}
                                    onClick={() => handleReport(category.report_category_id)}
                                >
                                    {category.value}
                                </MenuItem>
                            ))}

                            {isCurrentUserComment && (
                                <MenuItem
                                    onClick={handleDeletecomment}
                                    style={{ color: "#FFFFFF", background: "#22543D", margin: "10px", borderRadius: "5px" }}
                                >
                                    Delete Comment
                                </MenuItem>
                            )}
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
}