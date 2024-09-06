import { useState, useEffect, useContext } from "react";
import {
  HeaderCounselor,
  CounselorCard,
  Pagination,
} from "@/components/Counselor";
import { Navigation } from "@/components/common";
import { useRouter } from "next/router";
import { AppContext } from "@/providers/AppContext";
import { CounselorData } from "@/providers/AppContext";
import { API_BASE } from "@/lib/projectApi";
import { changeTimeZone } from "@/utils/dateFormated";
import { useAllSchedule } from "@/hooks/counselor/scheduleHooks";

const ITEMS_PER_PAGE = 12;

const Counselor = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const setCounselor = context.setCurrentCounselor;

  const { listSchedules } = useAllSchedule();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [counselors, setCounselors] = useState<CounselorData[]>([]);
  const [dateFilter, setDateFilter] = useState<any>(null);
  const [filteredCounselors, setFilteredCounselors] = useState<CounselorData[]>(
    []
  );

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch(`${API_BASE}/counselors`); // Change this to API endpoint
        const data = await response.json();
        console.log("counselor data", data);
        setCounselors(data.data);
        setFilteredCounselors(data.data);
      } catch (error) {
        console.error("Failed to fetch counselor data", error);
      }
    };

    fetchCounselorData();
  }, []);

  useEffect(() => {
    const filtered = counselors.filter((counselor) =>
      counselor.first_name.toLowerCase().includes(searchField.toLowerCase())
    );

    const scheduledCounselorIds = listSchedules
      .filter((schedule: any) => schedule.from === dateFilter)
      .map((schedule: any) => schedule.account_id);

    const availableCounselors = counselors.filter(
      (counselor: any) => !scheduledCounselorIds.includes(counselor.account_id)
    );

    setFilteredCounselors(availableCounselors);
    // setFilteredCounselors(filtered);
    setCurrentPage(1);
  }, [searchField, counselors, dateFilter]);

  const handleClick = (id: number, counselor: CounselorData) => {
    router.push(`/Counselor/${id}`);
    setCounselor(counselor);
  };

  const totalCounselors = filteredCounselors.length;
  const totalPages = Math.ceil(totalCounselors / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedCounselors = Array.isArray(filteredCounselors)
    ? filteredCounselors.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];

  const handleOnChange = (event: { target: { value: string } }) => {
    setSearchField(event.target.value);
  };

  const handleDateChange = (newDate: string) => {
    const dateInWIB = changeTimeZone(newDate, "WIB");
    setDateFilter(dateInWIB);
  };

  return (
    <>
      <Navigation />
      <div className="py-5 px-8 md:px-12 lg:px-32 md:py-5 min-h-screen">
        <HeaderCounselor
          handleOnChange={handleOnChange}
          onDateChange={handleDateChange}
        />
        <div className="w-full py-5 grid md:grid-cols-2 lg:grid-cols-3 gap-y-5">
          {displayedCounselors.map((counselor, index) => (
            <CounselorCard
              key={index}
              counselor={counselor}
              handleClick={() => handleClick(counselor.account_id, counselor)}
            />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Counselor;
