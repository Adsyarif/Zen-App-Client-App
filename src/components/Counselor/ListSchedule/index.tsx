import { useEffect, useState } from "react";
import { useIdSchedule } from "@/hooks/counselor/scheduleHooks";
import {
  changeTimeZone,
  dataCompile,
  dateManipulation,
  formatDate,
  formatDateRender,
} from "@/utils/dateFormated";
// import TimeSlotGrid, { Props } from "../TimeSlotGrid";
import TimeSlotGrid from "../TimeSlotGrid";
import { API_BASE } from "@/lib/projectApi";

const ListSchedule = ({ counselorId }: any) => {
  // const userBook =
  const today = new Date();
  const visibleCards = 1;
  const formatToday = changeTimeZone(today.toString(), "WIB");
  const renderDateOnCard = formatDateRender(formatToday, "WIB", "short");

  const { listSchedules } = useIdSchedule(counselorId);
  const [dateBooked, setDateBooked] = useState<any>({
    startFrom: "",
    endTo: "",
  });
  const [isBooked, setIsBooked] = useState({
    7: false,
    10: false,
    13: false,
    16: false,
    19: false,
    22: false,
  });
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
  console.log(checkData);
  const nextSlide = () => {
    for (let i = 0; i < checkData.length; i++) {
      for (let key in checkData[i]) {
        const newDate = dateManipulation(currentDate, "+");
        const newDateRender = formatDateRender(newDate, "WIB", "short");
        console.log(checkData[i][key]);
        if (currentIndex < checkData.length - visibleCards) {
          setCurrentDate(newDateRender);
          setCurrentIndex(currentIndex + 1);
        }
      }
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

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const timeRange = (event.target as HTMLDivElement).textContent?.trim();
    const startTime = timeRange?.split(" - ")[0];
    const endTime = timeRange?.split(" - ")[1];
    if (startTime) {
      setIsBooked((prev: any) => {
        const newState = { ...prev };
        for (const key in newState) {
          if (parseInt(key) === parseInt(startTime)) {
            newState[key] = true;
          }
        }
        return newState;
      });

      setDateBooked({
        startFrom: dateManipulation(`${currentDate} ${startTime}`),
        endTo: dateManipulation(`${currentDate} ${endTime}`),
      });
    }
  };

  // const props: Props = {
  //   currentIndex: currentIndex,
  //   visibleCards: visibleCards,
  //   checkData: checkData,
  //   currentDate: currentDate,
  //   isBooked: isBooked,
  //   dateBooked: dateBooked,
  //   handleClick: handleClick,
  //   changeTimeZone: changeTimeZone,
  //   dateManipulation: dateManipulation,
  // };

  // useEffect(() => {
  //   const bookedSchedule = async () => {
  //     try {
  //       const response = await fetch(`${API_BASE}/list_schedule/${bookId}`, {
  //         method: "PUT",
  //         body: JSON.stringify({
  //           booked_by_account_id: currentUser.account_id,

  //         })
  //       });
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //   };

  //   bookedSchedule();
  // }, [dateBooked]);

  return (
    <div className="mx-7 my-5 text-lg rounded-2xl bg-leaf p-5 relative text-center">
      <div className="relative w-full overflow-hidden px-12">
        <div className="text-mocca font-bold text-2xl flex justify-between p-2">
          <p>List Schedule</p>
          <p>{currentDate}</p>
        </div>

        {/* <TimeSlotGrid {...props} /> */}
        <TimeSlotGrid />

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
    </div>
  );
};

export default ListSchedule;
