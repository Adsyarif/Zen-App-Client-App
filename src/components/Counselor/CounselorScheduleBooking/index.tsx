import { AppContext } from "@/providers/AppContext";
import axios from "axios";
import { useContext, useState } from "react";
import { useGetCounselorSchedule } from "@/api/counselor/counselorSchedule/getCounselorSchedule";
import { API_BASE } from "@/lib/projectApi";

export function CounselorScheduleBooking() {
  const { currentUser } = useContext(AppContext); // Access logged-in user's account ID
  const [selectedScheduleId, setSelectedScheduleId] = useState("");

  const { availableSchedule, scheduleIsLoading, scheduleIsError } =
    useGetCounselorSchedule();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScheduleId(event.target.value);
  };

  if (scheduleIsLoading) {
    return <div>Loading ...</div>;
  }
  if (scheduleIsError) {
    return "Error fetching data";
  }

  const bookSchedule = async (scheduleId: string) => {
    try {
      if (!scheduleId) {
        alert("Please select a schedule first.");
        return;
      }

      // Use the PUT route with account_id and scheduleId
      const response = await axios.put(
        `${API_BASE}/list_schedule/book/${currentUser?.account_id}/${scheduleId}`
      );

      if (response.status === 200) {
        alert("Schedule successfully booked!");
      }
    } catch (error) {
      console.error("Error booking schedule", error);
      alert("Failed to book the schedule.");
    }
  };

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

  return (
    <>
      <div className="m-5">
        <h1 className="font-semibold text-lg">Book a Schedule</h1>
        <select
          value={selectedScheduleId}
          onChange={handleSelectChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="" disabled>
            Select a schedule
          </option>
          {availableSchedule.map((schedule) => (
            <option key={schedule.schedule_id} value={schedule.schedule_id}>
              <span>
                {" "}
                {new Date(schedule.available_from).toLocaleDateString(
                  "EN-US",
                  dateFormat
                )}
                ||
              </span>
              <span>
                {new Date(schedule.available_from).toLocaleTimeString("en-US", {
                  ...timeFormat,
                  timeZone: "UTC",
                })}{" "}
                -
                {new Date(schedule?.available_to).toLocaleTimeString("en-US", {
                  ...timeFormat,
                  timeZone: "UTC",
                })}
              </span>

              {/* (Counselor: {schedule.counselor_detail.user_name}) */}
            </option>
          ))}
        </select>
        <button
          onClick={() => bookSchedule(selectedScheduleId)}
          className="bg-leaf rounded-lg m-0 my-3 p-1 py-4 text-cream"
        >
          Book Schedule
        </button>
      </div>{" "}
    </>
  );
}
