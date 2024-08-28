import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/AppContext";
import { Schedule } from "@/providers/AppContext";
import axios from "axios";
import { API_BASE } from "@/lib/projectApi";

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
  const { currentUser, currentCounselor } = useContext(AppContext);
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
                schedule.status === null
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

    const dateInZone = `${fromDate.toLocaleDateString("en_US", {
      ...dateFormat,
      timeZone: "UTC",
    })}`;
    const timeInZone = `${fromDate.toLocaleDateString("en_US", {
      ...timeFormat,
      timeZone: "UTC",
    })} - ${toDate.toLocaleDateString("en-US", {
      ...timeFormat,
      timeZone: "UTC",
    })}`;
    return `${dateInZone} ${timeInZone}`;
  };
  return (
    <>
      <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
        <h3 className="font-semibold text-xl mb-2 text-teal-900">
          Upcoming Consultation Schedule
        </h3>
        {schedules.length > 0 ? (
          schedules.map((schedule_item) => (
            <div
              key={schedule_item.schedule_id}
              className="flex justify-between bg-[#fafaf4] p-2 rounded-md mb-2"
            >
              <div className="flex flex-col p-2 rounded-md">
                <div className="flex justify-start gap-4">
                  <Image
                    src="/counselorImg.png"
                    width={120}
                    height={70}
                    className="object-cover object-center border-2 border-[#C1D8C3] rounded-full w-14 h-14"
                    alt="user Image"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-semibold">
                      Psychologist in Charge: {currentCounselor?.first_name}{" "}
                      {currentCounselor?.last_name}
                    </h6>
                    <a
                      href="#"
                      className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-full p-1"
                    >
                      Diary you shared
                    </a>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <h6 className="font-semibold">Booked Details</h6>
                    <p>
                      Schedule:{" "}
                      {formatDateAndTime(
                        schedule_item.available_from,
                        schedule_item.available_to
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <a
                  href="#"
                  className="text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1"
                >
                  Join
                </a>
                <a
                  href="#"
                  className="text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1"
                >
                  Reschedule
                </a>
                <a
                  href="#"
                  className="text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1"
                >
                  Done
                </a>
                <a
                  href="#"
                  className="text-center text-[#fafaf4] rounded-md bg-red-600 hover:bg-red-700 p-1"
                >
                  Cancel
                </a>
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
