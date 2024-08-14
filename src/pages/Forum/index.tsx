import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { API_BASE } from "@/lib/projectApi";
import { AppContext } from "@/providers/AppContext";
import { PostList, PostListProps } from "@/components/forums/postList";
import { TopTopics } from "@/components/forums/topTopic";
import { UserPost } from "@/components/forums/userPost";
import Navigation from "@/components/common/Navigation";
import topTopicImage from "@/assets/img/top-topic.png";
import topTopicData from "@/data/topTopicData.json";

export default function ForumPage() {
  const { currentUser, reportCategories, setReportCategories } = useContext(AppContext);
  const [posts, setPosts] = useState<PostListProps[]>([]);

  const fetchData = async () => {
    try {
      if (!currentUser) {
        console.log("No user logged in");
        return;
      }

      const response = await axios.get(`${API_BASE}/post`);
      const data = response.data.data;
      console.log(data)

      const likeResponse = await axios.get(`${API_BASE}/like/${currentUser.account_id}`);
      const userLikes = likeResponse.data.data;

      const bookmarkResponse = await axios.get(`${API_BASE}/bookmarks/${currentUser.account_id}`);
      const userBookmark = bookmarkResponse.data.data;

      if (Array.isArray(data)) {
        const filteredPosts = data.filter((post: any) => post.deleted_at === null);
        const sortedPosts = filteredPosts.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const formattedPosts: PostListProps[] = sortedPosts.map((post: any) => {
          const isLiked = userLikes.some((like: any) => like.post_id === post.post_id);
          const isBookmark = userBookmark.some((bookmark: any) => bookmark.post_id === post.post_id);
          const isCurrentUserPost = post.account_id === currentUser?.account_id;
          return {
            post_id: post.post_id,
            postContent: post.content,
            username: post.user_name,
            commentCount: post.comment_count,
            bookmarkCount: post.bookmark_count,
            likeCount: post.like_count,
            isLiked,
            isBookmark,
            onReportPost: handleReportPost,
            onLikeToggle: handleLikeToggle,
            onBookmarkToggle: handleBookmarkToggle,
            onDeletePost: handleDeletePost,
            reportCategories,
            isCurrentUserPost
          };
        });

        setPosts(formattedPosts);
      } else {
        console.error("Expected an array but got:", data);
      }

      if (reportCategories.length === 0) {
        const categoriesResponse = await axios.get(`${API_BASE}/report_category`);
        const dataCategories = categoriesResponse.data.data;
        setReportCategories(dataCategories);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onClickPublishPost = async (content: string) => {
    try {
      if (!currentUser) {
        alert("User is not logged in.");
        return;
      }
      await axios.post(`${API_BASE}/post/${currentUser.account_id}`, {
        content,
      });

      await fetchData();

    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser, reportCategories, setReportCategories]);

  const handleDeletePost = async (postId: string) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("User is not logged in.");
        return;
      }
      await axios.post(`${API_BASE}/post/delete/${postId}`, {
        "account_id":currentUser.account_id
      });
      
      alert("Post delete successfully.");
      await fetchData();
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  const handleReportPost = async (postId: string, categoryId: number) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("User is not logged in.");
        return;
      }
      await axios.post(`${API_BASE}/report_post/${accountId}/${postId}`, {
        report_category_id: categoryId,
      });

      
      alert("Post reported successfully.");
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  }

  const handleLikeToggle = async (postId: string, isLiked: boolean) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("User is not logged in.");
        return;
      }

      if (isLiked) {
        await axios.delete(`${API_BASE}/like/${accountId}/${postId}`);
      } else {
        await axios.post(`${API_BASE}/like/${accountId}/${postId}`);
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === postId ? { ...post, isLiked: !isLiked, likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleBookmarkToggle = async (postId: string, isBookmark: boolean) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("User is not logged in.");
        return;
      }

      if (isBookmark) {
        await axios.delete(`${API_BASE}/bookmarks/${accountId}/${postId}`);
      } else {
        await axios.post(`${API_BASE}/bookmarks/${accountId}/${postId}`);
      }

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.post_id === postId ? { ...post, isBookmark: !isBookmark, bookmarkCount: isBookmark ? post.bookmarkCount - 1 : post.bookmarkCount + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="flex flex-col bg-mocca sm:flex-row lg:mx-auto justify-center lg:w-4/5 mb-24">
        <div className="bg-mocca mt-0 pt-0 lg:w-3/5">
          {currentUser ? (
            <>
              <UserPost onPost={onClickPublishPost} />
              {posts.map((prop, i) => (
                <PostList {...prop} key={i + "postList"} />
              ))}
            </>
          ) : (
            <p className="text-white p-4">Please log in to view posts.</p>
          )}
        </div>

        <div className="text-white rounded-md bg-leaf p-3 mx-10 my-3 w-4/5 lg:flex flex-col justify-end lg:w-fit h-fit">
          <Image src={topTopicImage} alt="Top topics" />
          <h2 className="text-3xl my-3">Top topics</h2>
          <hr />
          {topTopicData.map((prop, i) => (
            <TopTopics {...prop} key={i + "topicName"} />
          ))}
        </div>
      </div>
    </>
  );
}