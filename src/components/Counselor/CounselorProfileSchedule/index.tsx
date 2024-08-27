import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import axios from "axios";
import { Schedule } from "@/providers/AppContext";
import { AppContext } from "@/providers/AppContext";
import { API_BASE } from "@/lib/projectApi";

import style from "./counselorSched.module.css";
import AddScheduleModal from "../AddSchedulesModal";
import JoinMeetingModal from "../JoinMeetingModal";
import { useRouter } from "next/router";

const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",  
};

const timeFormat: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Jakarta",  
};

const CounselorProfileSchedule: React.FC = () => {
  const { currentUser } = useContext(AppContext);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [listSchedules, setListSchedules] = useState<Schedule[]>([]);
  const [historySchedules, setHistorySchedules] = useState<Schedule[]>([]);
  const [newSchedule, setNewSchedule] = useState({
   available_from: '',
   available_to: '',
  });
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [open, setOpen] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const router = useRouter();

  const fetchSchedules = async () => {
    try {
      if (currentUser?.account_id) {
        const response = await axios.get(`${API_BASE}/list_schedule/${currentUser.account_id}`);
        const data = response.data.data;
        console.log("list", data);
        if (Array.isArray(data)) {
          const orderBy = data.sort((a: any, b: any) => new Date(b.available_from).getTime() - new Date(a.available_from).getTime());
          const filtered = orderBy.filter((schedule: Schedule) => schedule.booked_by_account_id !== null && schedule.status === null);
          const filteredHistory = orderBy.filter((schedule: Schedule) => schedule.booked_by_account_id !== null && schedule.status !== null);
          const filteredList= orderBy.filter((schedule: Schedule) => schedule.booked_by_account_id == null && schedule.status == null);
          setFilteredSchedules(filtered); 
          setListSchedules(filteredList);
          setHistorySchedules(filteredHistory);
        }
      }
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [currentUser]);

  

  const formatDateAndTime = (availableFrom: string, availableTo: string) => {
    const fromDate = new Date(availableFrom);
    const toDate = new Date(availableTo);
  
    const datePart = fromDate.toLocaleDateString("en-US", {
      ...dateFormat,
      timeZone: "Asia/Jakarta"
    });
  
    const timePart = `${fromDate.toLocaleTimeString("en-US", {
      ...timeFormat,
      timeZone: "Asia/Jakarta"
    })} - ${toDate.toLocaleTimeString("en-US", {
      ...timeFormat,
      timeZone: "Asia/Jakarta"
    })}`;
  
    return `${datePart} ${timePart}`;
  };

  const groupSchedulesByDate = (schedules: Schedule[]) => {
    const grouped: { [date: string]: Schedule[] } = {};
    schedules.forEach((schedule) => {
      const dateKey = new Date(schedule.available_from).toLocaleDateString(
        "en-US",
        {
          ...dateFormat,
          timeZone: "Asia/Jakarta"
        }
      );
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(schedule);
    });
    return grouped;
  };

  const groupedSchedules = groupSchedulesByDate(listSchedules);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewSchedule((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSaveSchedule = async () => {
    try {
      if (!newSchedule.available_from || !newSchedule.available_to) {
        alert("Please fill out all fields.");
        return;
      }
  
      if (editingSchedule) {
        const response = await axios.put(`${API_BASE}/list_schedule/reschedule/${currentUser?.account_id}/${editingSchedule.schedule_id}`, {
          ...newSchedule,
        });
  
        if (response.status === 200) {
          setListSchedules((prevSchedules) =>
            prevSchedules.map((schedule) =>
              schedule.schedule_id === editingSchedule.schedule_id ? response.data.data : schedule
            )
          );
          alert("Schedule updated successfully.");
        } else {
          alert("Failed to update schedule.");
        }
      } else {
        const response = await axios.post(`${API_BASE}/list_schedule/${currentUser?.account_id}`, {
          ...newSchedule,
        });
  
        if (response.status === 201) {
          setListSchedules((prevSchedules) => [...prevSchedules, response.data.data]);
          alert("Schedule added successfully.");
        } else {
          alert("Failed to add schedule.");
        }
      }
  
      handleClose();
      await fetchSchedules();
    } catch (error) {
      console.error("Error saving schedule:", error);
    }
  };

  const handleDeleteSchedule = async (schedule: Schedule) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this schedule?");
  
      if (!isConfirmed) {
        return;
      }
      const response = await axios.delete(
        `${API_BASE}/list_schedule/counselor/delete/${currentUser?.account_id}/${schedule.schedule_id}`
      );
  
      if (response.status === 200) {
        setListSchedules((prevSchedules) =>
          prevSchedules.filter((s) => s.schedule_id !== schedule.schedule_id)
        );
        alert("Schedule deleted successfully.");
      } else {
        alert("Failed to delete schedule.");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleMarkDone = async(schedule: Schedule) => {
    try {
      const isConfirmedMark = window.confirm("Are you sure you want to finish this schedule?");

      if (!isConfirmedMark){
        return;
      }
      const response = await axios.put(
        `${API_BASE}/list_schedule/status/${currentUser?.account_id}/${schedule.schedule_id}`
      );if (response.status === 200) {
        setListSchedules((prevSchedules) =>
          prevSchedules.filter((s) => s.schedule_id !== schedule.schedule_id)
        );
        alert("Schedule Finished");
        await fetchSchedules();
      } else {
        alert("Failed to Finished schedule.");
      }
    } catch (error) {
      console.error("Error Finished schedule:", error);
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewSchedule({
      available_from: '',
      available_to: '',
    });
    setEditingSchedule(null);
  };

  const handleEditOpen = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setNewSchedule({
      available_from: schedule.available_from,
      available_to: schedule.available_to,
    });
    setOpen(true);
  };

  const handleOpenModal = async (schedule: Schedule) => {
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
        
      </div>

      {/* List schedule */}
      <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
        <h3 className="font-semibold text-xl mb-2 text-teal-900">List Schedule</h3>
        <div className="flex bg-[#fafaf4] p-2 rounded-md">
          <table className={`${style.table} bg-mocca text-xs sm:text-base`}>
            <thead>
              <tr>
                <th>Date of Consultation</th>
                <th>Consultation Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedSchedules).map((date) => (
                <tr key={date}>
                  <td className="py-2 px-4 border-b">{date}</td>
                  <td className="py-2 px-4 border-b">
                    {groupedSchedules[date].map((schedule, i) => (
                      <div key={i} className="mb-1">
                        {new Date(schedule.available_from).toLocaleTimeString("en-US", {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })} - {new Date(schedule.available_to).toLocaleTimeString("en-US", {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b ">
                    {groupedSchedules[date].map((schedule) => (
                      <div key={schedule.available_from} className="flex justify-center gap-2 mb-1">
                        <button
                          onClick={() => handleEditOpen(schedule)}
                          className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-md px-2 py-1 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSchedule(schedule)}
                          className="text-center text-[#fafaf4] bg-red-600 hover:bg-red-700 rounded-md px-2 py-1 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        {selectedSchedule && (
        <JoinMeetingModal
          isOpen={showJoinModal}
          onRequestClose={() => setShowJoinModal(false)}
          meetingFrom={selectedSchedule.available_from}
          meetingTo={selectedSchedule.available_to}
          meetingLink={`https://zoom.us/join`}
        />
      )}
        <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
            <button onClick={handleOpen} className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-md p-1">
                Create Schedule
            </button>
            <AddScheduleModal
              open={open}
              handleClose={handleClose}
              handleInputChange={handleInputChange}
              handleSave={handleSaveSchedule}
              newSchedule={newSchedule}
              editingSchedule={editingSchedule}
              
            />
        </div>
      </div>

      {/* counsultation histories */}
      <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
        <h3 className="font-semibold text-xl mb-2 text-teal-900">Counsultation Histories</h3>
        <div className="flex bg-[#fafaf4] p-2 rounded-md">
            <table className={`${style.table} bg-mocca text-xs sm:text-base`}>
                <thead>
                    <tr>
                        <th>Date of Consultation</th>
                        <th>Counsultation Time</th>
                        <th>Users Name</th>
                    </tr>
                </thead>
                <tbody>
                    {historySchedules.length > 0 ? (
                        historySchedules.map((item) => (
                            <tr key={item.schedule_id}>
                                <td className="py-2 px-4 border-b">
                                    {new Date(item.available_from).toLocaleDateString("en-US", dateFormat)}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {`${new Date(item.available_from).toLocaleTimeString("en-US", timeFormat)} - ${new Date(item.available_to).toLocaleTimeString("en-US", timeFormat)}`}
                                </td>
                                <td className="py-2 px-4 border-b"> {item.booked_by_user?.first_name} {item.booked_by_user?.last_name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="py-2 px-4 text-center">
                                No consultation histories available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default CounselorProfileSchedule;
