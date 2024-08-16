import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_BASE } from '@/lib/projectApi';
import { AppContext } from "@/providers/AppContext";
import Image from "next/image";
import userIcon from "@/assets/icon/icon-user.png";
import { Navigation } from "@/components/common";

import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";


export interface BookmarkProps {
  post_user_name: string;
  notification: string;
  content?: string;
  post_id: number;
  isBookamrk: boolean; 
}

export default function Bookmark() {
  const { currentUser } = useContext(AppContext);
  const [bookmarks, setBookmarks] = useState<BookmarkProps[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (!currentUser) {
          console.log("No user logged in");
          return;
        }
        const response = await axios.get(`${API_BASE}/bookmarks/${currentUser.account_id}`);
        console.log("API Response:", response.data);

        const listBookmarks = response.data.data;
        if (Array.isArray(listBookmarks)) {
          const mappedBookmarks = listBookmarks.map((bookmark: any) => ({
            post_user_name: bookmark.post_user_name,
            notification: bookmark.notification,
            content: bookmark.content, 
            post_id: bookmark.post_id,
            isBookamrk: true,
          }));
          setBookmarks(mappedBookmarks);
        }
      } catch (error) {
        console.error("Fetch bookmarks failed:", error);
      }
    };

    fetchBookmarks();
  }, [currentUser]);

  const handleBookmarkClick = async (post_id: number) => {
    try {
      if (!currentUser) {
        console.log("No user logged in");
        return;
      }

      const Index = bookmarks.findIndex((bookmarks) => bookmarks.post_id === post_id);
      const isBookamrk = bookmarks[Index].isBookamrk;

      if (isBookamrk) {
        await axios.delete(`${API_BASE}/bookmarks/${currentUser.account_id}/${post_id}`);
        setBookmarks(bookmarks.filter((bookmarks) => bookmarks.post_id !== post_id)); 
      } else {
        await axios.post(`${API_BASE}/bookmarks/${currentUser.account_id}/${post_id}`);
        setBookmarks(bookmarks.map((bookmarks) =>
          bookmarks.post_id === post_id ? { ...bookmarks, isBookamrk: true } : bookmarks
        ));
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <>
    <Navigation/>
    <div className="flex flex-col bg-mocca lg:mx-24 justify-center items-center">
      <div className="bg-mocca w-full lg:w-3/5 px-5 md:px-20">
        <button className="md:text-2xl rounded-md bg-leaf p-2 px-6 my-4 text-white font-medium">
          My Bookmarks
        </button>
        {bookmarks.map((bookmark, i) => (
          <div className="flex flex-col gap-3 border border-slate-400 p-3 m-3 bg-mocca rounded-md" key={i}>
            <div className="flex gap-3">
              <div className="flex justify-center items-start">
                <Image src={userIcon} alt="User icon" height={50} width={50} />
              </div>
              <div className="w-4/5 md:text-xl">
                <h3 className="my-2 font-medium">{bookmark.post_user_name}</h3>
                <p>{bookmark.content}</p> 
              </div>
              <div className="flex gap-1 items-center cursor-pointer" onClick={() => handleBookmarkClick(bookmark.post_id)}>
                {bookmark.isBookamrk ? < FaBookmark size={30} /> : <FaRegBookmark size={20} />}
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
}
