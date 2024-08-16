import { useEffect, useState } from "react";

export default function CarouselReviewCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const items = [
    {
      id: 1,
      name: "John Doe",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/men/1.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 2,
      name: "Jane Smith",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/women/2.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 3,
      name: "Michael Johnson",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/men/3.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 4,
      name: "Emily Davis",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/women/4.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 5,
      name: "William Brown",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/men/5.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
    {
      id: 6,
      name: "Sophia Wilson",
      time: "8 Agustus 2024",
      src: "https://randomuser.me/api/portraits/women/6.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    },
  ];

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
    <div className="relative mx-auto text-center my-8 p-8">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCards}%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-none px-4"
              style={{ flexBasis: `${100 / visibleCards}%` }}
            >
              <div className="bg-white p-6 shadow-lg rounded-lg text-left">
                <p className="text-gray-700">&quot;{item.text}&quot;</p>
                <div className="flex items-center mb-4 my-2">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={item.src}
                    alt={item.name}
                  />
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
  );
}
