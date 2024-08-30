import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/lib/projectApi";
import { useRouter } from "next/router";
import { UserDetailPostPublicProps } from "./type";

export function useGetUserDetailPosts() {
  const [posts, setPosts] = useState<UserDetailPostPublicProps[]>([]);
  const [postsIsLoading, setPostsIsLoading] = useState<boolean>(true);
  const [postsIsError, setPostsIsError] = useState<string | null>(null);

  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!id) return;
      setPostsIsLoading(true);
      try {
        const response: AxiosResponse<{
          data: UserDetailPostPublicProps[];
          status: {
            code: number;
            status: string;
          };
        }> = await axios.get(`${API_BASE}/post/get/${id}`);

        const listPosts = response.data.data;

        setPosts(listPosts);

        console.log(listPosts);
      } catch (error) {
        setPostsIsError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setPostsIsLoading(false);
      }
    };
    fetchUserPosts();
  }, [id]);

  const sortedPosts = posts.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return {
    sortedPosts,
    posts,
    postsIsLoading,
    postsIsError,
  };
}
