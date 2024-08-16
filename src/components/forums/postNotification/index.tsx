import Image from "next/image";
import userIcon from "@/assets/icon/icon-user.png";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

export interface PostNotificationProps {
  post_content: string;
  user_name: string;
  notification: string; 
  content?: string; 
}

export function PostNotification(props: PostNotificationProps) {
  const { post_content, user_name, notification, content } = props;

  console.log("PostNotification Props:", props);

  return (
    <div className="flex flex-col gap-3 border border-slate-400 p-3 m-3 bg-mocca rounded-md">
      <div className="flex gap-3">
        <div className="flex justify-center items-start">
          <Image src={userIcon} alt="User icon" height={50} width={50} />
        </div>
        <div className="w-4/5">
          <h3 className="my-2 font-medium md:text-xl">{user_name}</h3>
          <p className="text-lg">{notification === 'reply your post' ? 'Reply your post' : 'Like your post'}</p>
          <p className=" text-lg font-semibold ">{post_content}</p>
          
          {notification === 'reply your post' && content && (
            <p><SubdirectoryArrowRightIcon/> {content}</p>
          )}
        </div>
      </div>
     
    </div>
  );
}
