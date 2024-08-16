import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_BASE } from '@/lib/projectApi';
import { AppContext } from "@/providers/AppContext";
import Image from "next/image";
import userIcon from "@/assets/icon/icon-user.png";
import { Navigation } from "@/components/common";
import { IoMdMore } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export interface PostProps {
  post_id: number;
  user_name: string;
  notification: string;
  content?: string; 
}

export default function Post() {
  const { currentUser } = useContext(AppContext);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!currentUser) {
          console.log("No user logged in");
          return;
        }
        const response = await axios.get(`${API_BASE}/post/get/${currentUser.account_id}`);
        console.log("API Response:", response.data);

        const postPosts = response.data.data;
        if (Array.isArray(postPosts)) {
          const filteredPosts = postPosts.filter((post: any) => post.deleted_at === null);
          const mappedBookmarks = filteredPosts.map((posts: any) => ({
            post_id: posts.post_id,
            user_name: posts.user_name,
            notification: posts.notification,
            content: posts.content, 
          }));
          console.log("list", mappedBookmarks)
          setPosts(mappedBookmarks);
        }
      } catch (error) {
        console.error("Fetch posts failed:", error);
      }
    };

    fetchPost();
  }, [currentUser]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = async (post_id: number) => {
    try {
      if (!currentUser) {
        console.log("No user logged in");
        return;
      }
      await axios.delete(`${API_BASE}/delete/${post_id}`);
      setPosts((prevPosts) => prevPosts.filter(post => post.post_id !== post_id));
      handleClose();
    } catch (error) {
      console.error("Delete post failed:", error);
    }
  };

  return (
    <>
      <Navigation/>
      <div className="flex flex-col bg-mocca lg:mx-24 justify-start items-center min-h-screen ">
        <div className="bg-mocca w-full lg:w-3/5 px-5 md:px-20">
          <button className="md:text-2xl rounded-md bg-leaf p-2 px-6 my-4 text-white font-medium">
            My Post
          </button>
          {posts.map((post, i) => (
            <div className="flex md:text-xl flex-col gap-3 border border-slate-400 p-3 m-3 bg-mocca rounded-md" key={i}>
              <div className="flex gap-3">
                <div className="flex justify-center items-start">
                  <Image src={userIcon} alt="User icon" height={50} width={50} />
                </div>
                <div className="w-4/5">
                  <h3 className="my-2 font-medium">{post.user_name}</h3>
                  <p>{post.content}</p> 
                </div>
                <div className="flex items-start justify-end ml-auto">
                  <IconButton
                    aria-label="more"
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
                        backgroundColor: "#22543D",
                        width: "fit-content",
                        color: "#FFFFFF",
                      },
                    }}
                  >         
                    <MenuItem 
                    sx={{ fontSize: '20px' }}
                    onClick={() => handleDeleteClick(post.post_id)}>Delete</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
