import React from "react";
import { Schedule } from "@/providers/AppContext";
import style from "@/components/Counselor/CounselorProfileSchedule/counselorSched.module.css"
import AddScheduleModal from "../AddSchedulesModal";

interface ListScheduleProps {
    groupedSchedules: { [date: string]: Schedule[] };
    handleEditOpen: (schedule: Schedule) => void;
    handleDeleteSchedule: (schedule: Schedule) => void;
    handleOpen: () => void;
    open: boolean;
    handleClose: () => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveSchedule: () => void;
    newSchedule: {
      available_from: string;
      available_to: string;
    };
    editingSchedule: Schedule | null;
    onEdit?: (schedule: Schedule) => void; 
    onDelete?: (schedule: Schedule) => void;

  }
  
  const ListSchedule: React.FC<ListScheduleProps> = ({
    groupedSchedules,
    handleEditOpen,
    handleDeleteSchedule,
    handleOpen,
    open,
    handleClose,
    handleInputChange,
    handleSaveSchedule,
    newSchedule,
    editingSchedule,

  }) => {

    return (
      <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
        <h3 className="font-semibold text-xl mb-2 text-teal-900">List Schedule</h3>
        <div className="flex bg-[#fafaf4] p-2 rounded-md">
          {Object.keys(groupedSchedules).length > 0 ? (
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
          ) : (
            <p className="text-teal-900">No schedules available.</p>
          )}
        </div>
  
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
    );
  };
  
  export default ListSchedule;