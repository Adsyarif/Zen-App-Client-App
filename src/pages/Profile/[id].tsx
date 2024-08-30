import { useRouter } from "next/router";
import { IoMdArrowRoundBack } from "react-icons/io";

import { Navigation } from "@/components/common";

import {
  ProfilePublicDetail,
  ProfilePublicPosts,
} from "@/components/PofilePublic";

export default function ProfileDetail() {
  const route = useRouter();

  const handleGoBack = () => {
    route.back();
  };

  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <Navigation />
      <div className="bg-leaf p-3 m-5 rounded-xl lg:h-screen lg:mx-52">
        <h3
          onClick={handleGoBack}
          className="font-bold text-white flex gap-3 items-center hover:cursor-pointer"
        >
          <IoMdArrowRoundBack /> Go Back
        </h3>

        <div className="h-4/5 flex flex-col lg:flex-row lg:justify-center gap-5 lg:gap-10 my-5">
          <div className="lg:w-1/2">
            {/* profile data left */}
            <ProfilePublicDetail />
          </div>

          <div className="lg:w-1/2">
            {/* ini posts  */}
            <ProfilePublicPosts />
          </div>
        </div>
      </div>
    </>
  );
}
