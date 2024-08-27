import { API_BASE } from "@/lib/projectApi";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const shortDescription = (text: string, maxLength = 100): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const CounselorCard = ({ counselor, handleClick }: any) => {
  const [currentCounselor, setCurrentCounselor] = useState<string[]>([]);
  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/list_schedule/${counselor.counselor_id}`
        ); // Change this to API endpoint
        const data = await response.json();
        console.log(data);
        setCurrentCounselor(data.data);
      } catch (error) {
        console.error("Failed to fetch counselor data", error);
      }
    };

    fetchCounselorData();
  }, []);

  const isAvailable = currentCounselor ? true : false;
  const { reviews } = counselor;

  return (
    <div
      className="border rounded-xl w-full md:w-72 bg-leaf p-2 flex flex-col"
      onClick={handleClick}
    >
      <Image
        src={"/counselorImg.png"}
        width={320}
        height={120}
        alt={`Profile picture of ${counselor.name}`}
        className="w-full h-64 md:h-48 p-1 border rounded-2xl mb-4 border-leaf object-cover object-center"
      />

      <div className="text-cream">
        <h2 className="text-xl font-semibold">{counselor.name}</h2>
        <p className="min-h-[80px] text-sm mt-2">
          {shortDescription(counselor.detail)}
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-2xl text-star">{renderStars(avgRate(reviews))}</p>
        <p className="text-lg text-white ml-2">({counselor.reviews.length})</p>
      </div>
      <button
        disabled={!isAvailable}
        className={`mt-2 h-14 text-xl px-4 py-2 font-semibold rounded-lg ${
          isAvailable
            ? "bg-mocca text-leaf hover:bg-gray-200"
            : "bg-gray-400 text-gray-600 cursor-not-allowed"
        }`}
      >
        {isAvailable ? "Book Now" : "Fully Booked"}
      </button>
    </div>
  );
};

export default CounselorCard;
