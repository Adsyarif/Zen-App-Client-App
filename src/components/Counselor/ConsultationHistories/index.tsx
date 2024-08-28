import React from "react";
import style from "@/components/Counselor/CounselorProfileSchedule/counselorSched.module.css"
import { Schedule } from "@/providers/AppContext";

interface ConsultationHistoriesProps {
  historySchedules: Schedule[];
}

const ConsultationHistories: React.FC<ConsultationHistoriesProps> = ({ historySchedules }) => {
  return (
    <div className="bg-[#C1D8C3] rounded-md m-5 p-5  ">
      <h3 className="font-semibold text-xl mb-2 text-teal-900">Consultation Histories</h3>
      <div className="flex bg-[#fafaf4] p-2 rounded-md">
        <table className={`${style.table} bg-mocca text-xs sm:text-base`}>
          <thead>
            <tr>
              <th>Date of Consultation</th>
              <th>Consultation Time</th>
              <th>User's Name</th>
            </tr>
          </thead>
          <tbody>
            {historySchedules.length > 0 ? (
              historySchedules.map((item) => (
                <tr key={item.schedule_id}>
                  <td className="py-2 px-4 border-b">
                    {new Date(item.available_from).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      timeZone: "Asia/Jakarta",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {`${new Date(item.available_from).toLocaleTimeString("en-US", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })} - ${new Date(item.available_to).toLocaleTimeString("en-US", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}`}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item.booked_by_user?.first_name} {item.booked_by_user?.last_name}
                  </td>
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
  );
};

export default ConsultationHistories;
