import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_BASE } from '@/lib/projectApi';
import { AppContext } from "@/providers/AppContext";
import Image from "next/image";
import userIcon from "@/assets/icon/icon-user.png";
import { Navigation } from "@/components/common";


export interface LikeProps {
  post_user_name: string;
  content?: string; 
}

export default function Like() {
  const { currentUser } = useContext(AppContext);
  const [likes, setLikes] = useState<LikeProps[]>([]);

  useEffect(() => {
    const fetchLike = async () => {
      try {
        if (!currentUser) {
          console.log("No user logged in");
          return;
        }
        const response = await axios.get(`${API_BASE}/like/${currentUser.account_id}`);
        console.log("API Response:", response);

        const listLikes = response.data.data;
        console.log("list", listLikes)
        if (Array.isArray(listLikes)) {
          const mappedBookmarks = listLikes.map((like: any) => ({
            post_user_name: like.post_user_name,
            content: like.content, 
          }));
          console.log("list", mappedBookmarks)
          setLikes(mappedBookmarks);
        }
      } catch (error) {
        console.error("Fetch bookmarks failed:", error);
      }
    };

    fetchLike();
  }, [currentUser]);

  return (
    <>
    <Navigation/>
    <div className="flex flex-col bg-mocca lg:mx-24 justify-center items-center">
      <div className="bg-mocca w-full lg:w-3/5 px-5 md:px-20">
        <button className="rounded-md bg-leaf p-2 px-6 my-4 text-white font-medium">
          My Likes
        </button>
        {likes.map((like, i) => (
          <div className="flex flex-col gap-3 border border-slate-400 p-3 m-3 bg-mocca rounded-md" key={i}>
            <div className="flex gap-3">
              <div className="flex justify-center items-start">
                <Image src={userIcon} alt="User icon" height={50} width={50} />
              </div>
              <div className="w-4/5">
                <h3 className="my-2 font-medium">{like.post_user_name}</h3>
                <p>{like.content}</p> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
    
  );
}
