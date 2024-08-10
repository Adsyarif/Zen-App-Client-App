import { useState, useEffect } from "react";
import data from "@/data/counselorData.json";
import {
  HeaderCounselor,
  CounselorCard,
  Pagination,
} from "@/components/Counselor";

interface Review {
  content: string;
  name: string;
  date: string;
  rating: number;
}

interface CounselorData {
  name: string;
  detail: string;
  specialist: string;
  maxPatient: number;
  patientNames: string[];
  reviews: Review[];
}

const ITEMS_PER_PAGE = 12;

const Counselor = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [filteredCounselors, setFilteredCounselors] = useState<CounselorData[]>(
    data.counselors
  );

  useEffect(() => {
    const filtered = data.counselors.filter((counselor) =>
      counselor.specialist.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredCounselors(filtered);
    setCurrentPage(1);
  }, [searchField]);

  const totalCounselors = filteredCounselors.length;
  const totalPages = Math.ceil(totalCounselors / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOnChange = (event: { target: { value: string } }) => {
    setSearchField(event.target.value);
  };

  const displayedCounselors = filteredCounselors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="py-5 px-8 md:px-32 md:py-5 min-h-screen">
        <HeaderCounselor handleOnChange={handleOnChange} />
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
