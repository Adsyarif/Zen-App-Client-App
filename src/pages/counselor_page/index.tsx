import CounselorDetail from "@/components/counselor_detail";
import CounselorProfileCard from "@/components/Counselor/CounselorProfileCard";
import CounselorProfileSchedule from "@/components/Counselor/CounselorProfileSchedule";
import { Navigation } from "@/components/common";

const CounselorPage = () => {
  return (
    <div className="flex justify-evenly">
      <CounselorProfileCard />
      <CounselorProfileSchedule />
    </div>
  );
};

export default CounselorPage;
