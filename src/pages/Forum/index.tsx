import { PostList, PostListProps } from "@/components/forums/postList";
import { TopTopics } from "@/components/forums/topTopic";
import { UserPost } from "@/components/forums/userPost";
import { FetchUtil } from "@/lib";
import { useState, useEffect } from "react";
import topTopicImage from "@/assets/img/top-topic.png";
import topTopicData from "@/data/topTopicData.json";
import Image from "next/image";

export default function ForumPage() {
  const [posts, setPosts] = useState<PostListProps[]>([]);
  const getAllPost = async () => {
    const posts = await FetchUtil({
      url: "/api/getallpost",
    });
    setPosts(posts);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const onClickPublishPost = (content: string) => {};

  return (
    <>
      <div className="flex flex-col bg-mocca sm:flex-row lg:mx-24">
        <div className="bg-mocca mt-0 pt-0 lg:w-3/5">
          <UserPost onPost={onClickPublishPost} />

          {posts.map((prop, i) => (
            <PostList {...prop} key={i + "postList"} />
          ))}
        </div>

        <div className="text-white rounded-md bg-leaf p-3 mx-10 my-3 w-4/5 lg:flex flex-col lg:w-2/5 h-fit ">
          <Image src={topTopicImage} alt="Top topics" />
          <h2 className="text-3xl my-3"> Top topics</h2>
          <hr />
          {topTopicData.map((prop, i) => (
            <TopTopics {...prop} key={i + "topicName"} />
          ))}
        </div>
      </div>
    </>
  );
}
