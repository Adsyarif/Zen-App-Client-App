import React, { useState } from "react";
import Image from "next/image";
import { Schedule } from "@/providers/AppContext";
import JoinMeetingModal from "../JoinMeetingModal";
import ConsultationHistories from "../ConsultationHistories";
import ListSchedule from "../ScheduleList";
import { formatDateAndTime, groupSchedulesByDate } from "@/lib/scheduleUtils";
import Link from "next/link";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
interface CounselorProfileScheduleProps {
  filteredSchedules: Schedule[];
  listSchedules: Schedule[];
  historySchedules: Schedule[];
  handleSaveSchedule: () => void;
  handleDeleteSchedule: (schedule: Schedule) => void;
  handleMarkDone: (schedule: Schedule) => void;
  setNewSchedule: React.Dispatch<React.SetStateAction<{ available_from: string; available_to: string }>>;
  setEditingSchedule: React.Dispatch<React.SetStateAction<Schedule | null>>;
  newSchedule: { available_from: string; available_to: string };
  editingSchedule: Schedule | null;
  handleClose: () => void; 
  open: boolean; 
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const CounselorProfileSchedule: React.FC<CounselorProfileScheduleProps> = ({
  filteredSchedules,
  listSchedules,
  historySchedules,
  handleSaveSchedule,
  handleDeleteSchedule,
  setNewSchedule,
  handleMarkDone,
  setEditingSchedule,
  newSchedule,
  editingSchedule,

  handleClose,  
  open,  
  setOpen, 

  
}) => {

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const groupedSchedules = groupSchedulesByDate(listSchedules);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSchedule((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleOpen = () => setOpen(true);


  const handleEditOpen = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setNewSchedule({ available_from: schedule.available_from, available_to: schedule.available_to });
    setOpen(true);
  };

  const handleOpenModal = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowJoinModal(true);
  };

  return (
    <div className="flex flex-col bg-teal-900 md:w-1/2 w-full p-5 rounded-md h-fit">
      <div className="hidden lg:flex gap-3 text-white w-full font-semibold justify-around text-2xl py-3">
        <Link href={"/counselor_page/post"}>
          <FaRegComment />
        </Link>
        <Link href={"/counselor_page/bookmark"}>
          <FaRegBookmark />
        </Link>
        <Link href={"/counselor_page/like"}>
          <AiOutlineLike />
        </Link>
        <Link href={"/counselor_page/notification"}>
          <IoNotificationsOutline />
        </Link>
      </div>
      {/* Upcoming consultation list */}
      <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
        <h3 className="font-semibold text-xl mb-2 text-teal-900">Upcoming Consultation</h3>
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((item) => (
            <div key={item.schedule_id} className="flex justify-between bg-[#fafaf4] p-2 rounded-md mb-2">
              <div className="flex flex-col p-2 rounded-md">
                <div className="flex justify-start gap-4">
                  <Image
                    src="/counselorImg.png"
                    width={120}
                    height={70}
                    className="object-cover object-center border-2 border-[#C1D8C3] rounded-full w-14 h-14"
                    alt="user Image"
                  />
                  <div className="flex flex-col">
                    <h6 className="font-semibold">
                      {item.booked_by_user?.first_name} {item.booked_by_user?.last_name}
                    </h6>
                    <a href="#" className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-full p-1">
                      Diary
                    </a>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <h6 className="font-semibold">Booked Details</h6>
                    <p>Schedule: {formatDateAndTime(item.available_from, item.available_to)}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1"
                >
                  Join Meeting
                </button>
                <button disabled className=" cursor-not-allowed text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1">Reschedule</button>
                <button
                  onClick={() => handleMarkDone(item)} 
                  className="text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1"
                >
                  Done
                </button>
                <button disabled className=" cursor-not-allowed text-center text-[#fafaf4] rounded-md bg-red-600 hover:bg-red-700 p-1">Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-teal-900">No upcoming consultations available.</p>
        )}
        {showJoinModal && selectedSchedule && (
          <JoinMeetingModal
            schedule={selectedSchedule}
            isOpen={showJoinModal}
            onRequestClose={() => setShowJoinModal(false)}
            meetingFrom={selectedSchedule.available_from}
            meetingTo={selectedSchedule.available_to}
            meetingLink={`https://zoom.us/join`}
          />
        )}
      </div>

      <ListSchedule
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        groupedSchedules={groupedSchedules}
        handleEditOpen={handleEditOpen}
        handleDeleteSchedule={handleDeleteSchedule}
        handleInputChange={handleInputChange}
        newSchedule={newSchedule}
        handleSaveSchedule={handleSaveSchedule}
        editingSchedule={editingSchedule}
      />

      <ConsultationHistories historySchedules={historySchedules} />
    </div>
  );
};

export default CounselorProfileSchedule
