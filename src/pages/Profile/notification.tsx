import { Navigation } from "@/components/common";
import { PostNotification, PostNotificationProps } from "@/components/forums/postNotification";
import { useState, useEffect, useContext } from "react";
import { API_BASE } from '@/lib/projectApi';
import axios from 'axios';
import { AppContext } from "@/providers/AppContext";

export default function Notification() {
  const { currentUser } = useContext(AppContext); 
  const [notifications, setNotifications] = useState<PostNotificationProps[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
        try {
            if (!currentUser) {
                console.log("No user logged in");
                return;
            }

            const likeResponse = await axios.get(`${API_BASE}/notification/like/${currentUser?.account_id}`);
            const likeNotifications = likeResponse.data.data || [];

            const commentResponse = await axios.get(`${API_BASE}/notification/comments/${currentUser?.account_id}`);
            const commentNotifications = commentResponse.data.data || [];

            const combinedNotifications = [
                ...likeNotifications.map((notification: PostNotificationProps) => ({
                    ...notification,
                    notification: 'like your post'
                })),
                ...commentNotifications.map((notification: PostNotificationProps) => ({
                    ...notification,
                    notification: 'reply your post'
                }))
            ];

            console.log("Combined Notifications:", combinedNotifications);
            setNotifications(combinedNotifications);
        } catch (error) {
            console.error("Fetching notifications failed:", error);
        }
    };

    fetchNotifications();
  }, [currentUser]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen flex flex-col bg-mocca lg:mx-24 justify-start items-center">
        <div className="bg-mocca w-full lg:w-3/5 px-5 md:px-20">
          <button className="rounded-md bg-leaf p-2 px-6 my-4 text-white font-medium">
            My Notification
          </button>
          {notifications.map((prop, i) => (
            <PostNotification {...prop} key={i + "postNotification"} />
          ))}
        </div>
      </div>
    </>
  );
}
