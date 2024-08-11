import React, { useState } from "react";

interface MoodItem {
  id: number;
  moodStatus: string;
  moodCategory: "Happy" | "Unhappy";
}

const MoodPickerComponent: React.FC = () => {
  const [selectMoodStatus, setSelectMoodStatus] = useState<number | null>(null);

  const handleSelectMoodStatus = (id: number) => {
    setSelectMoodStatus(id);
  };
  const moodItems: MoodItem[] = [
    {
      id: 1,
      moodStatus: "Excited",
      moodCategory: "Happy",
    },
    {
      id: 2,
      moodStatus: "Happy",
      moodCategory: "Happy",
    },
    {
      id: 3,
      moodStatus: "Sad",
      moodCategory: "Unhappy",
    },
    {
      id: 4,
      moodStatus: "Stress",
      moodCategory: "Unhappy",
    },
    {
      id: 5,
      moodStatus: "Angry",
      moodCategory: "Unhappy",
    },
    {
      id: 6,
      moodStatus: "Hungry",
      moodCategory: "Unhappy",
    },
    {
      id: 7,
      moodStatus: "Fun",
      moodCategory: "Happy",
    },
    {
      id: 8,
      moodStatus: "Grateful",
      moodCategory: "Happy",
    },
    {
      id: 9,
      moodStatus: "Anxious",
      moodCategory: "Unhappy",
    },
    {
      id: 10,
      moodStatus: "Hopefull",
      moodCategory: "Happy",
    },
  ];

  const getColorMoodCategory = (moodCategory: "Happy" | "Unhappy"): string => {
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
    <div className="hidden lg:visible md:visible bg-green-900 text-lg font-semibold text-center items-center rounded-lg p-6 ">
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
