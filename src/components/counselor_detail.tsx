import React from "react";
import { BackButton, CounselorInformation, ListSchedule } from "./Counselor";

const CounselorDetail = ({ counselor, review }: any) => {
  console.log(review);
  return (
    <div className="text-black">
      <BackButton />
      <CounselorInformation counselor={counselor} review={review} />
      <ListSchedule counselorId={counselor.account_id} />
    </div>
  );
};

export default CounselorDetail;
