import { API_BASE } from "@/lib/projectApi";
import { Review } from "@/providers/AppContext";
import { avgRate, renderStars } from "@/utils/startsReview";
import { capitalFirstLetter } from "@/utils/stringFormated";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const CounselorCard = ({ counselor, handleClick }: any) => {
  const [currentCounselor, setCurrentCounselor] = useState<string[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviewCounselor = async () => {
      try {
        const response: AxiosResponse<{
          data: Review[];
          status: {
            code: number;
            status: string;
          };
        }> = await axios.get(
          `${API_BASE}/review_counselor/${counselor.account_id}`
        );

        const listReview = response.data.data;
        if (Array.isArray(listReview)) {
          const sortedReview = listReview.sort(
            (a: any, b: any) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

          const filteredReview = sortedReview.filter(
            (review: any) => review.deleted_at === null
          );

          setReviews(filteredReview);
        }
      } catch (error) {
        console.error("fetch diary list failed:", error);
      }
    };
    fetchReviewCounselor();
  }, []);

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/list_schedule/${counselor.counselor_id}`
        );
        const data = await response.json();
        setCurrentCounselor(data.data);
      } catch (error) {
        console.error("Failed to fetch counselor data", error);
      }
    };

    fetchCounselorData();
  }, []);

  console.log(reviews);
  const isAvailable = currentCounselor ? true : false;

  const rupiahCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(counselor.price);

  return (
    <div
      className="border rounded-xl w-full md:w-72 bg-leaf p-2 flex flex-col"
      onClick={handleClick}
    >
      <Image
        src={"/counselorImg.png"}
        width={320}
        height={120}
        alt={`Profile picture of ${counselor.first_name}`}
        className="w-full h-64 md:h-48 p-1 border rounded-2xl mb-4 border-leaf object-cover object-center"
      />

      <div className="text-mocca">
        <h2 className="text-xl font-semibold min-h-14">
          {capitalFirstLetter(counselor.first_name)}{" "}
          {capitalFirstLetter(counselor.last_name)}
        </h2>
        <p className="text-lg my-2">{capitalFirstLetter(counselor.title)}</p>
      </div>
      <div className="flex justify-between">
        <p className="bg-mocca text-leaf rounded-xl text-lg px-2">
          {counselor.year_of_experience} years
        </p>
        <div className="flex items-center bg-mocca justify-center px-2 rounded rounded-xl">
          <p className="text-2xl text-leaf">{renderStars(avgRate(reviews))}</p>
          <p className="text-lg text-leaf ml-2">({reviews.length})</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-mocca text-xl font-bold">Price</p>
        <p className="text-mocca text-lg">{rupiahCurrency}</p>
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
