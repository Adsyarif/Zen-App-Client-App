import { useEffect, useState } from "react";

export default function CarouselReviewCard({ counselor }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const items = counselor.reviews;

  const renderStars = (score: number, maxStars = 5): string => {
    const starFull = "★";
    const starEmpty = "☆";
    return starFull.repeat(score) + starEmpty.repeat(maxStars - score);
  };

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
    if (currentIndex < items.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative mx-auto text-center ">
      <div className="relative w-full overflow-hidden px-12">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
        >
          {items.map((item: any, index: any) => (
            <div
              key={index}
              className="flex-none px-4"
              style={{ flexBasis: `${100 / visibleCards}%` }}
            >
              <div className="border border-black p-6 shadow-lg rounded-lg text-left">
                <p className="text-gray-700">&quot;{item.content}&quot;</p>
                <div className="flex items-center mb-4 my-2">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="/profile people.png"
                    alt={item.name}
                  />
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-2xl text-leaf">
                      {renderStars(item.rating)}
                    </p>
                    <p className="text-sm text-gray-500">{item.date}</p>
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
