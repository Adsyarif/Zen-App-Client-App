import React, { useState } from "react";
import { MoodStatus } from "@/providers/AppContext";
import { useRouter } from "next/router";

interface MoodItem {
  id: number;
  moodStatus: string;
  moodCategory: string;
}

interface MoodPickerComponentProps {
  moodCategories: MoodStatus[];
  onMoodChange: (id: number, mood: string) => void;
}

const MoodPickerComponent: React.FC<MoodPickerComponentProps> = ({
  moodCategories,
  onMoodChange,
}) => {
  const [selectMoodStatus, setSelectMoodStatus] = useState<number | null>(null);

  const handleSelectMoodStatus = (id: number, moodStatus: string) => {
    setSelectMoodStatus(id);
    onMoodChange(id, moodStatus);
    alert(`Mood selected: ${moodStatus}, let's share your story 🤗`);
    route.push("#diary-textarea");
  };

  const moodItems: MoodItem[] = moodCategories.map((mood) => ({
    id: mood.status_id,
    moodStatus: mood.value,
    moodCategory:
      mood.mood_category_id.mood_category_id === 1 ? "Happy" : "Unhappy",
  }));

  const getMoodStyle = (mood: string) => {
    switch (mood) {
      case "excited":
        return {
          emoji: "🤩",
          styles:
            "bg-gradient-radial from-zinc-100 via-orange-200 to-orange-500/70 text-orange-800",
        };
      case "happy":
        return {
          emoji: "😊",
          styles:
            "bg-gradient-radial from-zinc-100 via-yellow-200 to-yellow-500/70 text-yellow-800",
        };
      case "sad":
        return {
          emoji: "😢",
          styles:
            "bg-gradient-radial from-zinc-100 via-blue-200 to-blue-500/70 text-blue-800",
        };
      case "fun":
        return {
          emoji: "😎",
          styles:
            "bg-gradient-radial from-zinc-100 via-pink-200 to-pink-500/70 text-pink-800",
        };
      case "angry":
        return {
          emoji: "😡",
          styles:
            "bg-gradient-radial from-zinc-100 via-red-200 to-red-500/70 text-red-800",
        };
      case "stress":
        return {
          emoji: "😰",
          styles:
            "bg-gradient-radial from-zinc-100 via-gray-200 to-gray-500/70 text-gray-800",
        };
      case "hungry":
        return {
          emoji: "🍔",
          styles:
            "bg-gradient-radial from-zinc-100 via-amber-200 to-amber-500/70 text-amber-800",
        };
      case "grateful":
        return {
          emoji: "🙏",
          styles:
            "bg-gradient-radial from-zinc-100 via-green-200 to-green-500/70 text-green-800",
        };
      case "anxious":
        return {
          emoji: "😟",
          styles:
            "bg-gradient-radial from-zinc-100 via-purple-200 to-purple-500/70 text-purple-800",
        };
      case "hopefull":
        return {
          emoji: "😇",
          styles:
            "bg-gradient-radial from-zinc-100 via-teal-200 to-teal-500/70 text-teal-800",
        };
      default:
        return {
          emoji: "😶",
          styles:
            "bg-gradient-radial from-zinc-100 via-gray-200 to-gray-500/70 text-gray-800",
        };
    }
  };

  const route = useRouter();

  return (
    <div
      id="mood-picker"
      className="bg-green-900 text-lg font-semibold text-center items-center rounded-lg p-6"
    >
      <p className="text-white text-2xl mb-6">Pick your current mood</p>
      <div className="bg-gray-100 grid-cols-2 rounded-lg shadow-md grid gap-4 p-4">
        {moodItems.map((moodItem) => {
          const moodStyle = getMoodStyle(moodItem.moodStatus);
          return (
            <button
              key={moodItem.id}
              onClick={() =>
                handleSelectMoodStatus(moodItem.id, moodItem.moodStatus)
              }
              className={`p-2`}
            >
              <div
                className={`p-4  text-center rounded-lg text-base ${moodStyle.styles}`}
              >
                {moodStyle.emoji} {moodItem.moodStatus}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodPickerComponent;
