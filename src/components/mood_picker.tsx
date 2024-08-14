import { MoodStatus } from "@/providers/AppContext";
import React, { useState } from "react";

interface MoodItem {
  id: number;
  moodStatus: string;
  moodCategory: "Happy" | "Unhappy";
}

interface MoodPickerComponentProps {
  moodCategories: MoodStatus[];
}

const MoodPickerComponent: React.FC<MoodPickerComponentProps> = ({ moodCategories }) => {
  const [selectMoodStatus, setSelectMoodStatus] = useState<number | null>(null);

  const handleSelectMoodStatus = (id: number) => {
    setSelectMoodStatus(id);
  };

  const moodItems: MoodItem[] = moodCategories.map(mood => ({
    id: mood.status_id,
    moodStatus: mood.value,
    moodCategory: mood.mood_category_id.mood_category_id === 1 ? "Happy" : "Unhappy", 
  }));
  console.log("tes",moodCategories);

  

  const getColorMoodCategory = (moodCategory: "Happy" | "Unhappy"): string => {
    console.log(moodCategory)
    switch (moodCategory) {
      case "Happy":
        return "bg-green-400"; 
      case "Unhappy":
        return "bg-blue-400"; 
      default:
        return "bg-gray-200"; 
    }
  };
  
  const randomMoodStatusPosition = (): React.CSSProperties => {
    const rowStart = Math.floor(Math.random() * 2) + 1;
    const colStart = Math.floor(Math.random() * 2) + 1;
    return {
      gridRowStart: rowStart,
      gridColumnStart: colStart,
    };
  };

  return (
    <div className="hidden md:block md:visible bg-green-900 text-lg font-semibold text-center items-center rounded-lg p-6">
      <p className="text-white text-2xl mb-6">Pick your current mood</p>
      <div
        className="bg-gray-100 rounded-lg shadow-md grid gap-4 p-4"
        style={{
          gridTemplateRows: "repeat(2, 1fr)",
          gridTemplateColumns: "repeat(2, 1fr)",
          position: "relative",
          height: "455px",
          margin: "10px",
        }}
      >
        {moodItems.map((moodItem) => (
          <button key={moodItem.id} className="p-2">
            <div
              className={`p-4 w-30 text-center rounded-lg text-black text-base ${getColorMoodCategory(
                moodItem.moodCategory
              )}`}
              style={randomMoodStatusPosition()}
              onClick={() => handleSelectMoodStatus(moodItem.id)}
            >
              {moodItem.moodStatus}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodPickerComponent;