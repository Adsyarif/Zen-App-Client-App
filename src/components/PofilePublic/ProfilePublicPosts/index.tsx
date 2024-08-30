import { useGetUserDetailPosts } from "@/api/users/userDetailPost/useGetUserDetailPost";
import { useGetUserDetailPublic } from "@/api/users/userDetailPublic/useGetUserDetailPublic";
import Image from "next/image";
import { useRouter } from "next/router";

export function ProfilePublicPosts() {
  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const route = useRouter();

  const { user } = useGetUserDetailPublic();

  const { sortedPosts, postsIsLoading } = useGetUserDetailPosts();

  const userImgSrc =
    user.gender_name == "female"
      ? "/user-image-public-female.png"
      : "/user-image-public-male.png";

  if (postsIsLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="bg-darkGreen flex flex-col lg:p-10 lg:h-full rounded-md">
      <h3 className="md:text-2xl rounded-t-md bg-lightGreen pl-1 p-2 mx-3 text-white font-medium">
        Posts by {user.user_name}
      </h3>
      <div className="pb-5 mx-3 bg-lightGreen lg:h-5/6 overflow-y-scroll">
        {sortedPosts.map((post) => (
          <>
            <div
              key={post.post_id}
              onClick={() => {
                route.push(`/Forum/Post/${post.post_id}`);
              }}
              className="flex md:text-xl flex-col gap-3 border border-slate-400 p-3 m-3 bg-mocca rounded-md hover:cursor-pointer"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-cen ter items-start gap-2">
                  <Image
                    src={userImgSrc}
                    alt="User icon"
                    height={50}
                    width={50}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="m y-2 font-medium">{post.user_name}</h3>
                    <p className="text-xs text-slate-500">
                      {new Date(post.created_at).toLocaleDateString(
                        "en-US",
                        dateFormat
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-4/5">
                  <p>{post.content}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
