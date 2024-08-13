import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_BASE } from "@/lib/projectApi";
import { Comment, PostReplyProps } from "@/components/forums/postDetail";
import { CommentList } from "@/components/forums/commentList";
import { CommentListProps } from "@/components/forums/commentList/index";
import { Navigation } from "@/components/common";
import { AppContext } from "@/providers/AppContext";
import { UserReply } from "@/components/forums/userReply";

export default function CommentPage() {
  const { currentUser, reportCategories, setReportCategories } = useContext(AppContext);
  const router = useRouter();
  const { post_id } = router.query as { post_id: string };

  const [post, setPost] = useState<PostReplyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<CommentListProps[]>([]);

  const fetchComments = async () => {
    try {
      
      const commentsResponse = await axios.get(`${API_BASE}/comments/${post_id}`);
      const commentsData = commentsResponse.data.data;
      
      if (Array.isArray(commentsData)) {
        const filteredComment = commentsData.filter((comment: any) => comment.deleted_at === null);
        const formattedComments = filteredComment.map((comment: any) => ({
          commentContent: comment.content,
          username: comment.user_name,
          comment_id: comment.comment_id,
          onReportComment: handleReportComment,
          reportCategories,
          onDeleteComment: handleDeleteComment,
          isCurrentUserComment: comment.account_id === currentUser?.account_id,
          isCurrentUserReport: comment.account_id === currentUser?.account_id
        }));
        setComments(formattedComments);
      } else {
        console.error("Expected an array but got:", commentsData);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const onClickReplyPost = async (content: string) => {
    try {
      if (!currentUser) {
        alert("User is not logged in.");
        return;
      }
      await axios.post(`${API_BASE}/comments/${currentUser.account_id}/${post_id}`, {
        content,
      });

      await fetchPost();
      await fetchComments();
    } catch (error) {
      console.error("Error posting reply:", error);
      alert("There was an error posting your reply. Please try again.");
    }
  };

  const fetchPost = async () => {
    try {
      if (post_id) {
        const postResponse = await axios.get(`${API_BASE}/post/${post_id}`);
        const postData = postResponse.data.data;

        const likesResponse = await axios.get(`${API_BASE}/like/${currentUser?.account_id}`);
        const userLikes = likesResponse.data.data;

        const bookmarksResponse = await axios.get(`${API_BASE}/bookmarks/${currentUser?.account_id}`);
        const userBookmark = bookmarksResponse.data.data;

        if (postData) {
          const isLiked = userLikes.some((like: any) => like.post_id === postData.post_id);
          const isBookmark = userBookmark.some((bookmark: any) => bookmark.post_id === postData.post_id);
          const isCurrentUserPost = postData.account_id === currentUser?.account_id;
          const formattedPost: PostReplyProps = {
            post_id: String(post_id),
            postContent: postData.content,
            username: postData.user_name,
            commentCount: postData.comment_count,
            bookmarkCount: postData.bookmark_count,
            likeCount: postData.like_count,
            isLiked,
            isBookmark,
            onReportPost: handleReportPost,
            onLikeToggle: handleLikeToggle,
            onBookmarkToggle: handleBookmarkToggle,
            reportCategories,
            isCurrentUserPost,
            onDeletePost: handleDeletePost,
          };
          setPost(formattedPost);
        } else {
          console.error("Data not found for post_id:", post_id);
        }
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (post_id) {
          await fetchPost();
          await fetchComments();

          if (reportCategories.length === 0) {
            const categoriesResponse = await axios.get(`${API_BASE}/report_category`);
            const dataCategories = categoriesResponse.data.data;
            setReportCategories(dataCategories);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [post_id, reportCategories, setReportCategories, currentUser]);

  const handleDeletePost = async (postId: string) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("User is not logged in.");
        return;
      }
      await axios.post(`${API_BASE}/post/delete/${accountId}/${postId}`, {
      });
      await fetchPost();
      alert("Post delete successfully.");
      router.push('/Forum/Post');
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("User is not logged in.");
        return;
      }
      await axios.post(`${API_BASE}/comments/delete/${accountId}/${commentId}`, {
      });
      await fetchComments();
      alert("Comment delete successfully.");
      
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  const handleReportPost = async (postId: string, categoryId: number) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("You need to be logged in to report a post.");
        return;
      }

      await axios.post(`${API_BASE}/report_post/${accountId}/${postId}`, {
        report_category_id: categoryId,
      });
      alert("Post reported successfully.");
    } catch (error) {
      console.error("Error reporting post:", error);
      alert("There was an error reporting the post. Please try again.");
    }
  };

  const handleLikeToggle = async (postId: string, isLiked: boolean) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("You need to be logged in to like a post.");
        return;
      }

      if (isLiked) {
        await axios.delete(`${API_BASE}/like/${accountId}/${postId}`);
      } else {
        await axios.post(`${API_BASE}/like/${accountId}/${postId}`);
      }

      setPost((prevPost) =>
        prevPost
          ? {
              ...prevPost,
              isLiked: !isLiked,
              likeCount: prevPost.likeCount ? prevPost.likeCount + (isLiked ? -1 : 1) : 0,
            }
          : prevPost
      );
    } catch (error) {
      console.error("Error toggling like status:", error);
      alert("There was an error liking the post. Please try again.");
    }
  };

  const handleBookmarkToggle = async (postId: string, isBookmark: boolean) => {
    try {
      const accountId = currentUser?.account_id;
      if (!accountId) {
        alert("You need to be logged in to bookmark a post.");
        return;
      }

      if (isBookmark) {
        await axios.delete(`${API_BASE}/bookmarks/${accountId}/${postId}`);
      } else {
        await axios.post(`${API_BASE}/bookmarks/${accountId}/${postId}`);
      }

      setPost((prevPost) =>
        prevPost
          ? {
              ...prevPost,
              isBookmark: !isBookmark,
              bookmarkCount: prevPost.bookmarkCount ? prevPost.bookmarkCount + (isBookmark ? -1 : 1) : 0,
            }
          : prevPost
      );
    } catch (error) {
      console.error("Error toggling bookmark status:", error);
      alert("There was an error bookmarking the post. Please try again.");
    }
  };

  const handleReportComment = async (commentId: string, categoryId: number) => {
    try {
      const accountId = currentUser?.account_id;
      await axios.post(`${API_BASE}/report_comment/${accountId}/${commentId}`, {
        report_category_id: categoryId,
      });
      alert("Comment reported successfully.");
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>No post found.</p>;
  }

  return (
    <>
      <Navigation />
      <div className="flex flex-row bg-mocca sm:flex-row lg:mx-auto lg:w-4/5 m-10 px-24">
        <div className=" mt-0 pt-0 w-full flex flex-col items-center">
          <Comment {...post} key={post.post_id}  />
          <UserReply onReply={onClickReplyPost}/>
          {comments.map((comment, index) => (
            <CommentList {...comment} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}