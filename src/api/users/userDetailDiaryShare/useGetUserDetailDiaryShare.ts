import { useEffect, useState } from "react";
import { DiaryProps } from "./diaryProps";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/lib/projectApi";
import { useSearchParams } from "next/navigation";

export function useGetUserDetailDiaryShare() {
  const [diary, setDiary] = useState<DiaryProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const idSearch = searchParams.get("userId");
  const id = idSearch ? Number(idSearch) : null;

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
  }, [id]);

  // Filter public diary/ share diary
  const diaryShared = diary.filter((diary) => diary.share === true);
  console.log(diaryShared);

  const diaryByUserId = diaryShared.filter((diary) => diary.account_id === id);
  console.log(diaryByUserId);

  return {
    isLoading,
    isError,
    diary,
    diaryByUserId,
  };
}
