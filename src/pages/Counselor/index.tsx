import { useState, useEffect } from "react";
import data from "@/data/counselorData.json";
import {
  HeaderCounselor,
  CounselorCard,
  Pagination,
} from "@/components/Counselor";
import { Navigation } from "@/components/common";
import dayjs, { Dayjs } from "dayjs";

interface Review {
  content: string;
  name: string;
  date: string;
  rating: number;
}

interface Patient {
  name: string;
  appointmentDate: string;
}

interface CounselorData {
  name: string;
  detail: string;
  specialist: string;
  maxPatient: number;
  patientNames: Patient[];
  reviews: Review[];
}

const ITEMS_PER_PAGE = 12;

const Counselor = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Dayjs | null>(null);
  const [filteredCounselors, setFilteredCounselors] = useState<CounselorData[]>(
    data.counselors
  );

  useEffect(() => {
    const filtered = data.counselors.filter((counselor) => {
      const isSpecialistMatch = counselor.specialist
        .toLowerCase()
        .includes(searchField.toLowerCase());
      const isDateMatch = dateFilter
        ? counselor.patientNames.some((patient) =>
            dayjs(patient.appointmentDate).isSame(dateFilter, "day")
          )
        : true;

      return isSpecialistMatch && isDateMatch;
    });
    setFilteredCounselors(filtered);
    setCurrentPage(1);
  }, [searchField, dateFilter]);

  const totalCounselors = filteredCounselors.length;
  const totalPages = Math.ceil(totalCounselors / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnChange = (event: { target: { value: string } }) => {
    setSearchField(event.target.value);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDateFilter(newDate); // Update date filter
  };

  const displayedCounselors = filteredCounselors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navigation />
      <div className="py-5 px-8 md:px-32 md:py-5 min-h-screen">
        <HeaderCounselor
          handleOnChange={handleOnChange}
          onDateChange={handleDateChange}
        />{" "}
        {/* Pass date change handler */}
        <div className="w-full py-5 flex justify-evenly flex-wrap gap-2">
          {displayedCounselors.map((counselor, index) => (
            <CounselorCard key={index} counselor={counselor} />
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
