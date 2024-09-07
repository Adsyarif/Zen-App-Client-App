import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/lib/projectApi";
import { CounselorScheduleProps } from "./counselorScheduleProps";
import { useRouter } from "next/router";

export function useGetCounselorSchedule() {
  const [schedules, setSchedules] = useState<CounselorScheduleProps[]>([]);
  const [scheduleIsLoading, setScheduleIsLoading] = useState<boolean>(true);
  const [scheduleIsError, setSecheduleIsError] = useState<string | null>(null);

  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    const fetchCounselorScheduleList = async () => {
      try {
        const response: AxiosResponse<{
          data: CounselorScheduleProps[];
          status: {
            code: number;
            status: string;
          };
        }> = await axios.get(`${API_BASE}/list_schedule/${id}`);

        const listSchedules = response.data.data;
        if (Array.isArray(listSchedules)) {
          setSchedules(listSchedules);
          console.log(listSchedules);
        }
        console.log(listSchedules);
      } catch (error) {
        setSecheduleIsError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setScheduleIsLoading(false);
      }
    };
    fetchCounselorScheduleList();
  }, []);

  const availableSchedule = schedules.filter(
    (schedule) => schedule.booked_by_account_id == null
  );

  console.log(schedules);
  console.log(availableSchedule);

  return {
    availableSchedule,
    scheduleIsLoading,
    scheduleIsError,
  };
}
