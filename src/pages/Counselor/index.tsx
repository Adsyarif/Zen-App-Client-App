import { useState, useEffect, useContext } from "react";
import {
  HeaderCounselor,
  CounselorCard,
  Pagination,
} from "@/components/Counselor";
import { Navigation } from "@/components/common";
import { useRouter } from "next/router";
import { AppContext } from "@/providers/AppContext";
import { CounselorData, UserContextType } from "@/providers/AppContext";

const ITEMS_PER_PAGE = 12;

const Counselor = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const getCounselor = context.currentCounselor;
  const setCounselor = context.setCurrentCounselor;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchField, setSearchField] = useState<string>("");
  const [counselors, setCounselors] = useState<CounselorData[]>([]);
  const [filteredCounselors, setFilteredCounselors] = useState<CounselorData[]>(
    []
  );

  useEffect(() => {
    const fetchCounselorData = async () => {
      try {
        const response = await fetch("/data/counselorData.json"); // Change this to API endpoint
        const data = await response.json();

        const counselorsWithAvgRating = data.counselors.map(
          (counselor: CounselorData) => ({
            ...counselor,
            avgRating: avgRate(counselor.reviews),
          })
        );
        const sortedCounselors = counselorsWithAvgRating.sort(
          (a: any, b: any) => b.avgRating - a.avgRating
        );

        setCounselors(sortedCounselors);
        setFilteredCounselors(sortedCounselors);
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

  const handleClick = (id: number, counselor: CounselorData) => {
    router.push(`/Counselor/${id}`);
    setCounselor(counselor);
  };

  // Pagination calculations
  const totalCounselors = filteredCounselors.length;
  const totalPages = Math.ceil(totalCounselors / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedCounselors = filteredCounselors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleOnChange = (event: { target: { value: string } }) => {
    setSearchField(event.target.value);
  };

  const avgRate = (reviews: any) => {
    const ratingCollection: any[] = [];
    reviews.map((review: any) => {
      const score = review["rating"];
      ratingCollection.push(score);
    });

    if (ratingCollection.length === 0) {
      return 0;
    }
    const total = ratingCollection.reduce((acc, nilai) => acc + nilai, 0);

    const average = total / ratingCollection.length;
    return Math.floor(average);
  };

  return (
    <>
      <Navigation />


      <div className="py-5 px-8 md:px-12 lg:px-32 md:py-5 min-h-screen">
        <HeaderCounselor handleOnChange={handleOnChange} />
        <div className="w-full py-5 grid md:grid-cols-2 lg:grid-cols-3 gap-y-5">
          {displayedCounselors.map((counselor) => (
            <CounselorCard
              key={counselor.counselor_id}
              counselor={counselor}
              handleClick={() => handleClick(counselor.counselor_id, counselor)}
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
