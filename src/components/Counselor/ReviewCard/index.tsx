import React, { useEffect, useState } from "react";
import { Review } from "@/providers/AppContext";
import { renderStars } from "@/utils/startsReview";

interface CarouselReviewCardProps {
  reviews: Review[];
}

export default function CarouselReviewCard({
  reviews,
}: CarouselReviewCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const updateVisibleCards = () => {
    if (window.innerWidth < 768) {
      setVisibleCards(1);
    } else if (window.innerWidth < 1024) {
      setVisibleCards(2);
    } else {
      setVisibleCards(3);
    }
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const nextSlide = () => {
    if (currentIndex < reviews.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative mx-auto text-center">
      <div className="relative w-full overflow-hidden px-12">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
        >
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-none px-4"
              style={{ flexBasis: `${100 / visibleCards}%` }}
            >
              <div className=" h-full border border-black p-6 shadow-lg rounded-lg text-left bg-[#DBE4D8]">
                <p className="text-gray-700">&quot;{review.content}&quot;</p>
                <div className="flex items-center mb-4 my-2">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="/profile people.png"
                    alt={review.user_first_name}
                  />
                  <div>
                    <p className="font-semibold text-black">
                      {review.user_first_name}
                    </p>
                    <p className="text-2xl text-leaf">
                      {renderStars(review.rating)}
                    </p>
                    <p className="text-sm text-gray-500">{review.created_at}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 w-10 left-4 transform -translate-y-1/2 bg-[#22543D] text-white p-2 rounded-full text-xl font-bold z-10"
        >
          <span className="sr-only">Previous</span>
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 w-10 right-4 transform -translate-y-1/2 bg-[#22543D] text-white p-2 rounded-full text-xl font-bold z-10"
        >
          <span className="sr-only">Next</span>
          &gt;
        </button>
      </div>
    </div>
  );
}
