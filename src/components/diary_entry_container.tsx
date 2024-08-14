import React, { useState } from "react";
import ZenZoneBrandLogo from "../../public/ZenZoneBrandPict.png";
import DropdownMoodPicker from "./dropdown_mood_picker";
import DropdownTripleDotsMenu from "./dropdown_triple_dots";
import DropdownCalendar from "./dropdown_callendar";

const DiaryEntryContainer: React.FC = () => {
  const [diaryText, setDiaryText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiaryText(event.target.value);
  };

  return (
    <div className="bg-green-900 text-lg font-semibold text-center items-center rounded-lg p-6 h-screen md:w-full">
      <p className="text-white text-2xl mb-6">My Diary Entry</p>
      <div className="bg-gray-100 rounded-lg shadow-md p-4 w-full h-full max-h-[80vh] overflow-y-auto">
        <div className="flex flex-row justify-between">
          <DropdownMoodPicker />
          <DropdownCalendar />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-green-900 text-left font-bold py-2 text-base">
              September 17th, 2020
            </p>
            <p className="text-green-900 text-left font-bold py-2 text-base">
              My current mood:
            </p>
          </div>
          <DropdownTripleDotsMenu />
        </div>
        <div className="relative bg-white rounded-lg p-4">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${ZenZoneBrandLogo.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.1,
              zIndex: 0,
            }}
          />
          <textarea
            className="w-full h-96 p-2 border-none outline-none bg-transparent resize-none text-black relative z-10 placeholder:text-center placeholder:text-slate-700"
            placeholder="It is still empty here"
            value={diaryText}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryContainer;
