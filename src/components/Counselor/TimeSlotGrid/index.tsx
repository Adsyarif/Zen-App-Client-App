import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/providers/AppContext";
import { Schedule } from "@/providers/AppContext";
import { API_BASE } from "@/lib/projectApi";
import Button from "@/common/button/button";

const TimeSlotGrid: React.FC = () => {
  const { currentCounselor } = useContext(AppContext);
  const { currentUser } = useContext(AppContext);
  const [schedulesAvailable, setSchedulesAvailable] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSchedulesAvailable = async () => {
      if (currentCounselor?.account_id) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${API_BASE}/list_schedule/${currentCounselor.account_id}`
          );
          console.log(response);
          const data = response.data.data;
          if (Array.isArray(data)) {
            const filteredSchedules = data.filter(
              (schedule: Schedule) =>
                schedule.booked_by_account_id === null &&
                schedule.status === null
            );
            console.log("filter", filteredSchedules);
            setSchedulesAvailable(filteredSchedules);
          }
        } catch (error) {
          console.error("Error fetching schedules", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchSchedulesAvailable();
  }, [currentCounselor?.account_id]);

  if (isLoading) {
    return <p className="text-white font-medium">Loading schedules...</p>;
  }

  const handleClickBookSchedule = async (schedule: Schedule) => {
    try {
      const isConfirmedBookSchedule = window.confirm(
        "Are you sure want to book this schedule?"
      );
      if (!isConfirmedBookSchedule) {
        return;
      }
      const response = await axios.put(
        `${API_BASE}/list_schedule/book/${currentUser?.account_id}/${schedule.schedule_id}`
      );
      if (response.status === 200) {
        setSchedulesAvailable((bookedSchedule) =>
          bookedSchedule.filter((s) => s.schedule_id !== schedule.schedule_id)
        );
        alert(
          "Booking consultation schedule successed! see you upcoming schedule in your profile"
        );
      } else {
        alert("Failed booking this consultation schedule");
      }
    } catch (error) {
      console.error("error booking this schedule:", error);
    }
  };

  return (
    <div className="schedule-grid">
      {schedulesAvailable.length > 0 ? (
        schedulesAvailable.map((schedule) => (
          <Button
            key={schedule.schedule_id}
            type="button"
            onClick={() => handleClickBookSchedule(schedule)}
            className="text-center text-black bg-[#FAF6E3] font-medium hover:bg-[#8C8C8C] rounded-md py-2 px-4 m-2"
          >
            <div className="schedule-slot">
              <p>{`${schedule.available_from}`}</p>
              <p>{`${schedule.available_to}`}</p>
              <p>{`Status: ${schedule.status || "Available"}`}</p>
            </div>
          </Button>
        ))
      ) : (
        <p className="text-white font-medium">No available schedules</p>
      )}
    </div>
  );
};

export default TimeSlotGrid;
