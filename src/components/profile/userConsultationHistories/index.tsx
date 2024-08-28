import React from "react";
import consulationHistory from "@/data/consultationHistory.json";
import style from "../userProfile.module.css";

const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const UserConsultationHistories = () => {
  return (
    <>
      <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
        <h3 className="font-semibold text-xl mb-2 text-teal-900">
          Counsultation Histories
        </h3>
        <div className="flex bg-[#fafaf4] p-2 rounded-md">
          <table className={`${style.table} bg-mocca text-xs sm:text-base`}>
            <thead>
              <tr>
                <th>Date of Consultation</th>
                <th>Psychologist in Charge</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {consulationHistory.map((item) => (
                <tr key={item.id}>
                  <td>
                    {new Date(item.date).toLocaleDateString(
                      "en-US",
                      dateFormat
                    )}
                  </td>
                  <td>{item.psychologist}</td>
                  <td>{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
          <button className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-full p-.5">
            see more
          </button>
        </div>
      </div>
    </>
  );
};

export default UserConsultationHistories;
