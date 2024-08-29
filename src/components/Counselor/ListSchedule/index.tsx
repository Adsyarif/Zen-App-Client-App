import { useEffect, useState } from "react";
import { useIdSchedule } from "@/hooks/counselor/scheduleHooks";
import {
  changeTimeZone,
  dataCompile,
  dateManipulation,
  formatDate,
  formatDateRender,
} from "@/utils/dateFormated";

const ListSchedule = ({ counselorId }: any) => {
  const today = new Date();
  const visibleCards = 1;
  const formatToday = changeTimeZone(today.toString(), "WIB");
  const renderDateOnCard = formatDateRender(formatToday, "WIB", "short");

  const { listSchedules, loading, error } = useIdSchedule(counselorId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(renderDateOnCard);

  const groupedData = listSchedules.reduce((acc: any, item) => {
    const date = formatDate(item.from);

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);

    return acc;
  }, {});

  const checkData = dataCompile(groupedData);
  const nextSlide = () => {
    if (
      checkData.length > 0 &&
      currentIndex < checkData.length - visibleCards
    ) {
      const newDate = dateManipulation(currentDate, "+");
      const newDateRender = formatDateRender(newDate, "WIB", "short");
      setCurrentDate(newDateRender);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const newDate = dateManipulation(currentDate, "-");
      const newDateRender = formatDateRender(newDate, "WIB", "short");
      setCurrentDate(newDateRender);
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mx-7 my-5 text-lg rounded rounded-2xl bg-leaf p-5 relative mx-auto text-center">
      <div className="relative w-full overflow-hidden px-12">
        <div className="text-mocca font-bold text-2xl flex justify-between p-2">
          <p>List Schedule</p>
          <p>{currentDate}</p>
        </div>
        <div
          className="flex transition-transform duration-500 ease-in-out mx-2 gap-5 w-full"
          style={{
            transform: `translateX(-${(currentIndex * 103) / visibleCards}%)`,
          }}
        >
          {checkData.map((data, index) => {
            return (
              <div
                key={index}
                className="flex-none px-4"
                style={{ flexBasis: `${100 / visibleCards}%` }}
              >
                <div
                  key={index}
                  className="grid grid-rows-2 grid-flow-col gap-5 justify-around py-4 w-full"
                >
                  <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
                    07:00 - 09:00
                  </div>
                  <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
                    10:00 - 12:00
                  </div>
                  <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
                    13:00 - 15:00
                  </div>
                  <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
                    16:00 - 18:00
                  </div>
                  <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
                    18:00 - 20:00
                  </div>
                  <div className="bg-mocca px-8 py-2 rounded-xl text-xl min-w-40 text-center">
                    21:00 - 24:00
                  </div>
                </div>
              </div>
            );
          })}
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
