import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { API_BASE } from "@/lib/projectApi";
import { UserDetailProps } from "./type";
import { useRouter } from "next/router";

export function useGetUserDetailPublic() {
  const [users, setUsers] = useState<UserDetailProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);

  const route = useRouter();
  const { id } = route.query;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!id) return;

      setIsLoading(true);

      try {
        const response: AxiosResponse<{
          data: UserDetailProps;
          status: {
            code: number;
            status: string;
          };
        }> = await axios.get(`${API_BASE}/user_details/${id}`);

        const detailUser = response.data.data;

        if (!detailUser.user_details[0].user_name) {
          console.error("User has no user_name, mismatch user role");
          return null;
        }

        setUsers(detailUser);

        console.log(detailUser);
      } catch (error) {
        setIsError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [id]);

  const user = {
    user_name: users?.user_details[0].user_name,
    first_name: users?.user_details[0].first_name,
    last_name: users?.user_details[0].last_name,
    email: users?.account.email,
    phone_number: users?.user_details[0].phone_number,
    gender_name: users?.user_details[0].gender_name,
  };

  return {
    users,
    user,
    isLoading,
    isError,
  };
}
