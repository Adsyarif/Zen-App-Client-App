import React, { use, useState } from "react";
import ZenZoneBrandLogo from "../../public/ZenZoneBrandPict.png";
import DropdownMoodPicker from "./dropdown_mood_picker";
import DropdownTripleDotsMenu from "./dropdown_triple_dots";
import dayjs, { Dayjs } from "dayjs";
import { FaCalendarAlt } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { date } from "yup";
import { DiaryMoodColor } from "./DiaryMoodColor";
import Link from "next/link";

interface DiaryEntryContainerProps {
  selectedDate: Dayjs | null;
  selectMoodStatus: number | null;
  moodText: string;
  diaryText: string;
  setDiaryText: (text: string) => void;
  setMoodText: (text: string) => void;
  setSelectedDate: (date: Dayjs | null) => void;
  onSave: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onShare?: () => void;
  diaryId: number | null;
}

const DiaryEntryContainer: React.FC<DiaryEntryContainerProps> = ({
  selectedDate,
  selectMoodStatus,
  moodText,
  diaryText,
  setMoodText,
  setDiaryText,
  setSelectedDate,
  onSave,
  onDelete,
  onEdit,
  onShare,
  diaryId,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDiaryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDiaryText(event.target.value);
  };

  const handelDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const formattedDate = selectedDate
    ? selectedDate.format("DD-MMMM-YYYY")
    : "No date selected";

  return (
    <div
      id="diary-textarea"
      className="bg-green-900 text-lg font-semibold text-center items-center rounded-lg p-6 h-screen"
    >
      <p className="text-white text-2xl mb-6">
        {selectMoodStatus ? "Edit Diary Entry" : "New Diary Entry"}
      </p>
      <div className="bg-gray-100 rounded-lg shadow-md p-4 w-full h-full max-h-[80vh] overflow-y-auto">
        <div className="flex md:hidden justify-end ">
          {/* <DropdownMoodPicker /> */}
          <FaCalendarAlt
            size={24}
            className="text-leaf md:text-2xl"
            onClick={() => setShowDatePicker(!showDatePicker)}
          />
          {showDatePicker && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                value={selectedDate}
                onChange={handelDateChange}
              />
            </LocalizationProvider>
          )}
        </div>
        <div className=" flex flex-col ">
          <div className=" flex flex-row justify-between">
            <div className=" flex flex-col">
              <p className="text-green-900 text-left font-bold py-2">
                Date: {formattedDate}
              </p>
              <p className="text-green-900 text-left font-bold py-2">
                My current mood:{" "}
                <Link href={"#mood-picker"}>
                  <DiaryMoodColor mood={moodText || "Select your mood"} />
                </Link>
              </p>
            </div>
            <div className=" flex items-center">
              <DropdownTripleDotsMenu
                onSave={onSave}
                onEdit={onEdit}
                onDelete={onDelete}
                onShare={onShare ?? (() => {})}
                diaryId={diaryId ? diaryId.toString() : ""}
              />
            </div>
          </div>
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
            // id="diary-textarea"
            className="w-full h-96 p-2 border-none outline-none bg-transparent resize-none text-black relative z-10 placeholder:text-center placeholder:text-slate-700"
            placeholder="It is still empty here"
            value={diaryText}
            onChange={handleDiaryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DiaryEntryContainer;
