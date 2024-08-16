import dayjs from 'dayjs';
import router from 'next/router';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa";


export interface DiaryProps {
    account_id: number;
    diary_id: number;
    content: string;
    created_at: string;
    mood_status_id: {
        mood_category_id:{
            mood_category_id: number,
            name: string,
        }
        status_id: number,
        value: string,
    };
    update_at: string;
    value: string
}

export function DiaryCard ({
    account_id,
    diary_id,
    value,
    content,
    created_at,
}: DiaryProps){
    const handleClick = () => {
        router.push({
            pathname: '/Diary/detail', 
            query: { account_id, diary_id } 
        });
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }} className="flex flex-col w-full gap-2 text-lg font-semibold text-center items-center rounded-lg p-1 h-auto">
            <div className="w-full"> 
                    <div  className="diary-card flex-col bg-white shadow-md rounded-lg p-4 m-4">
                        <div className="flex  justify-between m-2">
                            <div className="text-[#22543D] font-bold text-sm md:text-xl ">
                                Mood: {value}
                            </div>
                            <div className="text-[#22543D] font-bold text-sm md:text-xl">
                                {dayjs(created_at).format("DD-MMMM-YYYY")}
                            </div>
                            </div>
                            <div className="m-2 font-normal text-black text-left text-sm md:text-xl">{content}</div>
                        </div>
                    
                    </div>
            </div>)
}

