import { API_BASE } from "@/lib/projectApi";
import { changeTimeZone } from "@/utils/dateFormated";
import { useEffect, useState } from "react";

export const useAllSchedule = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch(`${API_BASE}/list_schedule`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchedules(data.data);
      } catch (error: any) {
        setError(error.message);
        console.error("Failed to fetch counselor data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselorData();
  }, []);

  const listSchedules = schedules.map((schedule: any) => {
    return {
      bookID: schedule.schedule_id,
      patientId: schedule.counselor_id,
      counselorId: schedule.counselor_detail.account_id,
      from: changeTimeZone(schedule.available_from, "WIB"),
      to: changeTimeZone(schedule.available_to, "WIB"),
    };
  });

  return { listSchedules, loading, error };
};

export const useIdSchedule = (id: number) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch(`${API_BASE}/list_schedule/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchedules(data.data);
      } catch (error: any) {
        setError(error.message);
        console.error("Failed to fetch counselor data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselorData();
  }, []);

  const listSchedules = schedules.map((schedule: any) => {
    return {
      bookID: schedule.schedule_id,
      patientId: schedule.counselor_id,
      counselorId: schedule.counselor_detail.account_id,
      from: changeTimeZone(schedule.available_from, "WIB"),
      to: changeTimeZone(schedule.available_to, "WIB"),
    };
  });

  return { listSchedules, loading, error };
};
