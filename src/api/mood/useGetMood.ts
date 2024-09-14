import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/lib/projectApi";
import { MoodStatusID } from "./diaryProp";

export function useGetMood() {
  const [moodList, setMoodList] = useState<MoodStatusID[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const response: AxiosResponse<{
          data: MoodStatusID[];
          status: {
            code: number;
            status: string;
          };
        }> = await axios.get(`${API_BASE}/mood_status`);

        const listMood = response.data.data;
        if (Array.isArray(listMood)) {
          setMoodList(listMood);
        }
        console.log(listMood);
      } catch (error) {
        setIsError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMood();
  }, []);

  console.log(moodList);

  return {
    moodList,
    isLoading,
    isError,
  };
}
