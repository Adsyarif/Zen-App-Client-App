import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/AppContext";
import { Schedule } from "@/providers/AppContext";
import axios from "axios";
import { API_BASE } from "@/lib/projectApi";
import Button from "@/common/button/button";
import Image from "next/image";

const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
};

const timeFormat: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const UserUpcomingConsultation: React.FC = () => {
  const { currentUser } = useContext(AppContext);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        if (currentUser?.account_id) {
          const response = await axios.get(
            `${API_BASE}/list_schedule/user/${currentUser.account_id}`
          );

          const data = response.data.data;
          console.log("list", data);
          if (Array.isArray(data)) {
            const filteredSchedules = data.filter(
              (schedule: Schedule) =>
                schedule.booked_by_account_id !== null &&
                schedule.status === "UPCOMING"
            );
            console.log("filter", filteredSchedules);
            setSchedules(filteredSchedules);
          }
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    if (currentUser?.account_id) {
      fetchSchedules();
    }
  }, [currentUser]);

  const formatDateAndTime = (availableFrom: string, availableTo: string) => {
    const fromDate = new Date(availableFrom);
    const toDate = new Date(availableTo);

    const formattedDate = fromDate.toLocaleDateString("en-US", {
      ...dateFormat,
      timeZone: "UTC",
    });

    const fromTime = fromDate.toLocaleTimeString("en-US", {
      ...timeFormat,
      timeZone: "UTC",
    });
    const toTime = toDate.toLocaleTimeString("en-US", {
      ...timeFormat,
      timeZone: "UTC",
    });

    return `${formattedDate} ${fromTime} - ${toTime}`;
  };

  const handleDoneConsultation = async (schedule: Schedule) => {
    try {
      const isConfirmedDone = window.confirm(
        "Are you sure want to finish this consultation?"
      );

      if (!isConfirmedDone) {
        return;
      }
      const response = await axios.put(
        `${API_BASE}/list_schedule/status/${currentUser?.account_id}/${schedule.schedule_id}/${schedule.counselor_id}`
      );
      if (response.status === 200) {
        setSchedules((prevSchedules) =>
          prevSchedules.filter((s) => s.schedule_id !== schedule.schedule_id)
        );
        alert("Consultation Finished! Thank you for your response.");
      } else {
        alert("Failed to finish this consultation");
      }
    } catch (error) {
      console.error("Error finishing consultation schedule:", error);
    }
  };

  return (
    <>
      <div className="bg-[#C1D8C3] rounded-md mx-auto my-5 p-5 max-w-4xl shadow-lg">
        <h3 className="font-semibold text-xl mb-4 text-teal-900">
          Upcoming Consultation Schedule
        </h3>
        {schedules.length > 0 ? (
          schedules.map((schedule_item) => (
            <div
              key={schedule_item.schedule_id}
              className="flex justify-between items-center gap-5 bg-[#fafaf4] p-4 rounded-lg mb-4 shadow-md"
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Image
                    src="/counselorImg.png"
                    width={80}
                    height={80}
                    className="object-cover object-center border-2 border-[#C1D8C3] rounded-full w-20 h-20"
                    alt="user Image"
                  />
                  <div className="ml-4"></div>
                </div>
                <h6 className="font-semibold">
                  Psychologist: {schedule_item.counselor_detail?.first_name}{" "}
                  {schedule_item.counselor_detail?.last_name}
                </h6>
                <a
                  href="#"
                  className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-full py-2 px-4 mt-2 inline-block w-48"
                >
                  Diary you shared
                </a>
                <div className="my-5">
                  <h2 className="font-semibold">Consultation Details:</h2>
                  <p>
                    Schedule:{" "}
                    {formatDateAndTime(
                      schedule_item.available_from,
                      schedule_item.available_to
                    )}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-2 mt-4">
                  <a
                    href="#"
                    className="text-center text-[#fafaf4] bg-teal-900 hover:bg-teal-950 rounded-md py-2 px-4"
                  >
                    Join
                  </a>
                  <a
                    href="#"
                    className="text-center text-[#fafaf4] bg-teal-900 hover:bg-teal-950 rounded-md py-2 px-4"
                  >
                    Reschedule
                  </a>
                  <Button
                    type="button"
                    onClick={() => handleDoneConsultation(schedule_item)}
                    className="text-center text-[#fafaf4] bg-teal-900 hover:bg-teal-950 rounded-md py-2 px-4"
                  >
                    Done
                  </Button>
                  <a
                    href="#"
                    className="text-center text-[#fafaf4] bg-red-600 hover:bg-red-700 rounded-md py-2 px-4"
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-teal-900">No upcoming consultation schedule</p>
        )}
      </div>
    </>
  );
};

export default UserUpcomingConsultation;
