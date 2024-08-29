import { useContext, useState, useEffect } from "react";
import { AppContext, Schedule } from "@/providers/AppContext";
import { API_BASE } from "@/lib/projectApi";
import axios from "axios";
import CounselorProfileCard, { CounselorProfileCardProps } from "@/components/Counselor/CounselorProfileCard";
import CounselorProfileSchedule from "@/components/Counselor/CounselorProfileSchedule";
import { Navigation } from "@/components/common";
import { useRouter } from "next/router";
import ReactStars from "react-stars";
import React from "react";

const CounselorPage = () => {
  const [counselorData, setCounselorData] = useState<CounselorProfileCardProps["counselorData"] | null>(null);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [listSchedules, setListSchedules] = useState<Schedule[]>([]);
  const [historySchedules, setHistorySchedules] = useState<Schedule[]>([]);
  const [newSchedule, setNewSchedule] = useState({
    available_from: '',
    available_to: '',
  });
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const { currentUser, setCurrentUser } = useContext(AppContext);
  const router = useRouter();
  const [rating, setRating] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
    setNewSchedule({ available_from: '', available_to: '' });
    setEditingSchedule(null);
  };

  const fetchData = async () => {
    try {
      if (currentUser?.account_id) {
        const [counselorRes, schedulesRes, ratingCounselorRes] = await Promise.all([
          axios.get(`${API_BASE}/counselor/${currentUser.account_id}`),
          axios.get(`${API_BASE}/list_schedule/${currentUser.account_id}`),
          axios.get(`${API_BASE}/review_counselor/${currentUser.account_id}/average_ratings`)
        ]);

        const counselorData = counselorRes.data.data;
        const schedulesData = schedulesRes.data.data || [];
        const ratingCounselor = ratingCounselorRes.data.data.average_ratings;
        

        setCounselorData({
          account_id: currentUser.account_id,
          email: counselorData.account.email,
          ...counselorData.counselor_details[0],
        });

        
        const orderedSchedules = schedulesData.sort((a: any, b: any)  => new Date(b.available_from).getTime() - new Date(a.available_from).getTime());
        setFilteredSchedules(orderedSchedules.filter((schedule: Schedule) => schedule.booked_by_account_id && schedule.status === "UPCOMING"));
        setListSchedules(orderedSchedules.filter((schedule: Schedule) => !schedule.booked_by_account_id && schedule.status === null));
        setHistorySchedules(orderedSchedules.filter((schedule: Schedule) => schedule.booked_by_account_id && schedule.status === "DONE"));
        setRating(ratingCounselor)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const handleSave = async (updatedData: any) => {
    try {
      const { email, ...dataToUpdate } = updatedData;
      dataToUpdate.price = parseFloat(dataToUpdate.price);
      dataToUpdate.year_of_experience = parseInt(dataToUpdate.year_of_experience, 10);
      await axios.put(`${API_BASE}/counselor/edit/${counselorData?.account_id}`, dataToUpdate);
      alert("Update Data Succesfully")
      await fetchData();
    } catch (error) {
      console.error("Error saving counselor data:", error);
    }
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
          handleClose();

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
          handleClose()

        } else {
          alert("Failed to add schedule.");
        }
      }
      await fetchData(); 
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

  const LogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    router.push("/");
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
        await fetchData(); 
      } else {
        alert("Failed to Finished schedule.");
      }
    } catch (error) {
      console.error("Error Finished schedule:", error);
    }
  }

  if (!counselorData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen my-10 flex flex-col md:flex-row w-full ">
        <div className="gap-10 flex justify-center flex-col md:flex-row w-full">
          <CounselorProfileCard
            onLogout={LogOut}
            counselorData={counselorData}
            onSave={handleSave} 
            rating={rating}
          />
          <CounselorProfileSchedule
            filteredSchedules={filteredSchedules}
            listSchedules={listSchedules}
            historySchedules={historySchedules}
            handleSaveSchedule={handleSaveSchedule}
            handleDeleteSchedule={handleDeleteSchedule}
            handleMarkDone={handleMarkDone}
            setNewSchedule={setNewSchedule}
            setEditingSchedule={setEditingSchedule}
            newSchedule={newSchedule}
            editingSchedule={editingSchedule}
            handleClose={handleClose} 
            open={open}  
            setOpen={setOpen}
          />
        </div>
      </div>
    </>
  );
};

export default CounselorPage;
