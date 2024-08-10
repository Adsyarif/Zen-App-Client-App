import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center py-5">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 mx-2 text-leaf ${currentPage === 1 && "hidden"}`}
      >
        <FaChevronLeft />
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 mx-2 text-leaf ${
          currentPage === totalPages && "hidden"
        }`}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
