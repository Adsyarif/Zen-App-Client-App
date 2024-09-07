import React from "react";

interface TimeSlot {
  label: string;
  hours: number[];
}

export interface Props {
  currentIndex: number;
  visibleCards: number;
  checkData: any[];
  currentDate: string;
  isBooked: Record<number, boolean>;
  dateBooked: { startFrom: string };
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  changeTimeZone: (date: string, zone: string) => string;
  dateManipulation: (date: string) => string;
}

const TimeSlotGrid: React.FC<Props> = ({
  currentIndex,
  visibleCards,
  checkData,
  currentDate,
  isBooked,
  dateBooked,
  handleClick,
  changeTimeZone,
  dateManipulation,
}) => {
  const timeSlots: TimeSlot[] = [
    { label: "07:00 - 09:00", hours: [7, 8, 9] },
    { label: "10:00 - 12:00", hours: [10, 11, 12] },
    { label: "13:00 - 15:00", hours: [13, 14, 15] },
    { label: "16:00 - 18:00", hours: [16, 17, 18] },
    { label: "19:00 - 21:00", hours: [19, 20, 21] },
    { label: "22:00 - 24:00", hours: [22, 23, 24] },
  ];

  return (
    <div
      className="flex transition-transform duration-500 ease-in-out mx-2 gap-5 w-full"
      style={{
        transform: `translateX(-${(currentIndex * 103) / visibleCards}%)`,
      }}
    >
      {checkData.map((data, index) => {
        const date = changeTimeZone(currentDate, "WIB").split(" ")[0];
        const bookedHr: string[] =
          data[date]?.map(
            (value: any) => value.to.split(" ")[1].split(":")[0]
          ) || [];

        return (
          <div
            key={index}
            className="flex-none px-4"
            style={{ flexBasis: `${100 / visibleCards}%` }}
          >
            <div className="grid grid-rows-2 grid-flow-col gap-5 justify-around py-4 w-full">
              {timeSlots.map((slot) => {
                const isBookedSlot = slot.hours.some(
                  (hr) =>
                    bookedHr.includes(hr.toString()) ||
                    (isBooked[hr] &&
                      dateManipulation(currentDate) ===
                        dateBooked.startFrom.split(" ")[0])
                );

                return (
                  <div
                    key={slot.label}
                    className={`${
                      isBookedSlot ? "bg-grey" : "bg-mocca"
                    } px-8 py-2 rounded-xl text-xl min-w-40 text-center`}
                    onClick={handleClick}
                  >
                    {slot.label}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeSlotGrid;
