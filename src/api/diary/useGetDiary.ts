import { useEffect, useState } from "react";
import { DiaryProps } from "./diaryProps";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/lib/projectApi";

export function useGetDiary() {
  const [diary, setDiary] = useState<DiaryProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaryList = async () => {
      try {
        const response: AxiosResponse<{
          data: DiaryProps[];
          status: {
            code: number;
            status: string;
          };
        }> = await axios.get(`${API_BASE}/diary`);

        const listDiary = response.data.data;
        if (Array.isArray(listDiary)) {
          setDiary(listDiary);
        }
        console.log(listDiary);
      } catch (error) {
        setIsError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiaryList();
  }, []);

  const sharedDiary = diary.filter((diary) => diary.share === true);

  return {
    diary,
    sharedDiary,
    isLoading,
    isError,
  };
}
