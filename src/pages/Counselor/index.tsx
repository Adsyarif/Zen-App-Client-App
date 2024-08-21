import { useState, useEffect } from "react";
import {
  HeaderCounselor,
  CounselorCard,
  Pagination,
} from "@/components/Counselor";
import { Navigation } from "@/components/common";
import Link from "next/link";

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
  const [counselors, setCounselors] = useState<CounselorData[]>([]);
  const [filteredCounselors, setFilteredCounselors] = useState<CounselorData[]>(
    []
  );

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch("/data/counselorData.json"); // Ganti aja ini API
        const data = await response.json();
        console.log(data);
        setCounselors(data.counselors);
        setFilteredCounselors(data.counselors);
      } catch (error) {
        console.error("Failed to fetch counselor data", error);
      }
    };

    fetchCounselorData();
  }, []);

  useEffect(() => {
    const filtered = counselors.filter((counselor) =>
      counselor.specialist.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredCounselors(filtered);
    setCurrentPage(1);
  }, [searchField, counselors]);

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
      <Navigation />
      <div className="py-5 px-8 md:px-12 lg:px-32 md:py-5 min-h-screen">
        <HeaderCounselor handleOnChange={handleOnChange} />
        <div className="w-full py-5 grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 ">
          {displayedCounselors.map((counselor, index) => (
            <Link href={"/Counselor/detail"} key={index}>
              <CounselorCard counselor={counselor} />
            </Link>
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
