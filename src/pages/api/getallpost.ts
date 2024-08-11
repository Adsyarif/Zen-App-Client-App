// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PostListProps } from "@/components/forums/postList";

const data: PostListProps[] = [
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum? ",
    username: "Lorem",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum? ",
    username: "Lorem",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum?",
    username: "Lorem",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum?",
    username: "Lorem",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
  {
    postContent:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione quidem odit aspernatur. Totam dicta dolores minus sed, minima impedit repudiandae non, natus molestiae eveniet provident fugiat et porro similique! Cum?",
    username: "Lorem",
    likeCount: 10,
    bookmarkCount: 10,
    commentCount: 10,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostListProps[]>
) {
  res.status(200).json(data);
}
