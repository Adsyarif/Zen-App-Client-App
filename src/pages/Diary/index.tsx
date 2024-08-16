import { Navigation } from '@/components/common';
import { DiaryCard } from '@/components/diary_card';
import { API_BASE } from '@/lib/projectApi';
import axios, { Axios, AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DiaryProps } from '@/components/diary_card';
import { FaPlus } from 'react-icons/fa';
import DatePicker from '@/components/common/DatePicker';
import { Dayjs } from 'dayjs';
import { AppContext, UserContextType } from "@/providers/AppContext";
import Link from 'next/link';

const Diary = () => {
    const { currentUser } = useContext(AppContext); 
    const[diary, setDiary] = useState<DiaryProps[]>([]);;

    useEffect(() => {
        const fetchDiaryList = async () => {
            try {
                const response: AxiosResponse<{
                    data:DiaryProps[];
                    status:{
                        code: number;
                        status: string;
                    }
                }> = await axios.get(`${API_BASE}/diary/${currentUser?.account_id}`)
                const listDiary = response.data.data

                console.log("list diary", listDiary)

                if(Array.isArray(listDiary)){
                    const sortedPosts = listDiary.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                    const filteredDiary = sortedPosts.filter((diary: any) => diary.deleted_at === null);

                    setDiary(filteredDiary);
                } 
            } catch (error) {
                console.error("fetch diary list failed:", error);
            }
        }
        fetchDiaryList();
    }, []);
    
    return (
        <>
            <div className='min-h-screen'>
                <Navigation/>
                <div className='p-5 md:py-12 md:px-32 flex flex-row justify-between md:mx-30 lg:mx-60'>
                    <div className="flex w-full bg-leaf justify-center rounded-lg flex-col">
                        <div className="flex justify-between items-center p-10 gap-20">
                            <p className="text-white text-2xl md:text-4xl pt-5 font-bold">My Diary List</p>
                            <Link href={'/Diary/entry'}> 
                                <p className="text-2xl md:text-4xl align-center flex-end pt-6"><FaPlus style={{ color: 'white', fontSize: '24px' }}/></p>
                            </Link>
                        </div>
                        {diary.map((props, index)=>(
                            <DiaryCard {...props} key={index} />
                        ))}
                        </div>
                    <div className='hidden lg:hidden max-h-28 pl-10'>
                        <DatePicker type={'date'} label={''} onChange={function (date: Dayjs | null): void {
                                throw new Error('Function not implemented.');
                            } }/>
                    </div>
                </div>
            </div>
            
        </>
        
    )
}

export default Diary;


