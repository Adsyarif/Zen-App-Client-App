import React from "react";
import { useRouter } from "next/router";

const CounselorDetail = ({ counselor }: any) => {
  const renderStars = (score: number, maxStars = 5): string => {
    const starFull = "★";
    const starEmpty = "☆";
    return starFull.repeat(score) + starEmpty.repeat(maxStars - score);
  };

  const avgRate = (reviews: []) => {
    const rattingCollection: any[] = [];
    reviews.map((review) => {
      const score = review["rating"];
      rattingCollection.push(score);
    });

    if (rattingCollection.length === 0) {
      return 0;
    }
    const total = rattingCollection.reduce((acc, nilai) => acc + nilai, 0);

    const average = total / rattingCollection.length;
    return Math.floor(average);
  };

  const router = useRouter();
  return (
    <div className=" text-black">
      <div
        className="my-3 mx-7 text-black flex gap-5 aligh-center"
        onClick={() => router.push("/Counselor")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <p className="text-xl align-middle p-0">Back</p>
      </div>
      <div className="flex flex-col sm:flex-row my-3 mx-7 sm:justify-between">
        <div className="flex gap-8">
          <img
            className="h-40 w-40 rounded-full self-top shadow-2xl"
            src="https://randomuser.me/api/portraits/men/1.jpg"
          />
          <div className="flex flex-col self-center gap-1">
            <div className="text-2xl font-bold">{counselor.name}</div>
            <div className="text-xl font-semibold">Counseling doctor</div>
            <div className="flex items-center">
              <p className="text-2xl text-leaf ">
                {renderStars(avgRate(counselor.reviews))}
              </p>
              <p className="text-lg text-leaf ml-2">
                ({counselor.reviews.length})
              </p>
            </div>
            <div className="text-xl font-semibold">{counselor.specialist}</div>
          </div>
        </div>
        <button className="rounded-lg lg:px-5 md:px-5 bg-leaf text-mocca self-start h-12">
          Book Now
        </button>
      </div>
      <div className="mx-7 my-5 text-lg">{counselor.detail}</div>
    </div>
  );
};

export default CounselorDetail;
