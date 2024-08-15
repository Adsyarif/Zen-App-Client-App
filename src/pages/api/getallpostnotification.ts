// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PostNotificationProps } from "@/components/forums/postNotification";

const data: PostNotificationProps[] = [
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum? ",
    username: "Lorem",
    notification: "Reply Your Post",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum? ",
    username: "Lorem",
    notification: "Like Your Post",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum?",
    username: "Lorem",
    notification: "Reply Your Post",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum?",
    username: "Lorem",
    notification: "Reply Your Post",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum?",
    username: "Lorem",
    notification: "Reply Your Post",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostNotificationProps[]>
) {
  res.status(200).json(data);
}
