import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/lib/projectApi";
import { useRouter } from "next/router";
import { CounselorDetailProps } from "./counselorDetailProps";

export function useGetCounselorDetail() {
  const [counselorIsLoading, setCounselorIsLoading] = useState<boolean>(true);
  const [counselorIsError, setCounselorIsError] = useState<string | null>(null);
  const [counselor, setCounselor] = useState<CounselorDetailProps | null>(null);

  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch(`${API_BASE}/counselor/${id}`); // Change this to API endpoint
        const data = await response.json();
        setCounselor(data.data);
      } catch (error) {
        console.error("Failed to fetch counselor data", error);
      }
    };

    fetchCounselorData();
  }, []);

  useEffect(() => {
    const fetchCounselorData = async () => {
      if (!id) return;

      setCounselorIsLoading(true);

      try {
        const response: AxiosResponse<{
          data: CounselorDetailProps;
          status: {
            code: number;
            status: string;
          };
        }> = await axios.get(`${API_BASE}/user_details/${id}`);

        const detailCounselor = response.data.data;

        if (!detailCounselor.counselor_details[0]) {
          console.error("User has no user_name, mismatch user role");
          return;
        }

        setCounselor(detailCounselor);
      } catch (error) {
        setCounselorIsError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setCounselorIsLoading(false);
      }
    };
    fetchCounselorData();
  }, [id]);

  const counselorData = {
    counselor_name: counselor?.counselor_details[0].user_name,
    counselor_id: counselor?.counselor_details[0].account_id,
  };

  return {
    counselor,
    counselorData,
    counselorIsLoading,
    counselorIsError,
  };
}
