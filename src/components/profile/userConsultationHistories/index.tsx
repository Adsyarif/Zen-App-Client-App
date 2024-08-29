import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "@/providers/AppContext";
import { Schedule } from "@/providers/AppContext";
import { API_BASE } from "@/lib/projectApi";
import axios from "axios";

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

const UserConsultationHistories: React.FC = () => {
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
                schedule.status === "DONE"
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

  return (
    <>
      <div className="bg-[#C1D8C3] rounded-md mx-auto my-5 p-5 max-w-4xl shadow-lg">
        <h3 className="font-semibold text-xl mb-4 text-teal-900">
          Consultation Histories
        </h3>
        <div className="bg-[#fafaf4] p-4 rounded-lg shadow-md">
          <table className="w-full text-sm sm:text-base text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="pb-2">Date of Consultation</th>
                <th className="pb-2">Psychologist</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule_item) => (
                <tr
                  key={schedule_item.schedule_id}
                  className="border-b border-gray-200"
                >
                  <td className="py-2">
                    {formatDateAndTime(
                      schedule_item.available_from,
                      schedule_item.available_to
                    )}
                  </td>
                  <td className="py-2">
                    {schedule_item.counselor_detail?.first_name}{" "}
                    {schedule_item.counselor_detail?.last_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <button className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-full py-2 px-4">
            See more
          </button>
        </div>
      </div>
    </>
  );
};

export default UserConsultationHistories;
