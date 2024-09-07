import React from "react";
import { BackButton, CounselorInformation, ListSchedule } from "./Counselor";
import { CounselorScheduleBooking } from "./Counselor/CounselorScheduleBooking";

const CounselorDetail = ({ counselor, review }: any) => {
  return (
    <div className="text-black">
      <BackButton />
      <CounselorInformation counselor={counselor} review={review} />
      <CounselorScheduleBooking />
      <ListSchedule counselorId={counselor.account_id} />
    </div>
  );
};

export default CounselorDetail;
