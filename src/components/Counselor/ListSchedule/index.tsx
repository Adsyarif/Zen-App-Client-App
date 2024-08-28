import { useEffect, useState } from "react";
import { useIdSchedule } from "@/hooks/counselor/scheduleHooks";

const ListSchedule = ({ counselorId }: any) => {
  const { listSchedules, loading, error } = useIdSchedule(counselorId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 1;

  function formatDate(dateTime: string) {
    return dateTime.split(" ")[0];
  }

  const groupedData = listSchedules.reduce((acc: any, item) => {
    const date = formatDate(item.from);

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);

    return acc;
  }, {});

  const nextSlide = () => {
    if (listSchedules.length == 0)
      if (currentIndex < listSchedules.length - visibleCards) {
        setCurrentIndex(currentIndex + 1);
      }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mx-7 my-5 text-lg rounded rounded-2xl bg-leaf p-5 relative mx-auto text-center">
      <div className="relative w-full overflow-hidden px-12">
        <div className="text-mocca font-bold text-2xl flex justify-between p-2">
          <p>List Schedule</p>
          <p>Date</p>
        </div>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 101) / visibleCards}%)`,
          }}
        >
          <div className="grid grid-rows-2 grid-flow-col gap-5 justify-around py-4 w-full">
            <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
              Time 1
            </div>
            <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
              Time 2
            </div>
            <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
              Time 3
            </div>
            <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
              Time 4
            </div>
            <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
              Time 5
            </div>
            <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
              Time 6
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 w-10 left-4 transform -translate-y-1/2 bg-mocca text-leaf p-2 rounded-full text-xl font-bold z-10"
        >
          <span className="sr-only">Previous</span>
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 w-10 right-4 transform -translate-y-1/2 bg-mocca text-leaf p-2 rounded-full text-xl font-bold z-10"
        >
          <span className="sr-only">Next</span>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ListSchedule;
