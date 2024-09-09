import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { DiaryMoodColor } from "../DiaryMoodColor";
import { AppContext } from "@/providers/AppContext";
import { useSearchParams } from "next/navigation";

interface MoodFilterProps {
  moods: string[];
}
export function MoodFilter(props: MoodFilterProps) {
  const [isActive, setIsActive] = useState(true);
  const { currentUser } = useContext(AppContext);

  const { moods } = props;
  const route = useRouter();

  const { mood: selectedMood } = route.query;

  const searchParams = useSearchParams();

  const idSearch = searchParams.get("userId");
  const id = idSearch ? Number(idSearch) : null;

  const { query, pathname } = route; // Access current query and path

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleMoodClick = (mood: string) => {
    if (currentUser.role_id === 2) {
      if (route.query.mood === mood) {
        route.push(`/Diary`);
      } else {
        route.push(`/Diary?mood=${mood}`);
      }
    } else if (currentUser.role_id === 3) {
      // Add/Remove mood, but keep other params like userId
      if (query.mood === mood) {
        const { mood, ...rest } = query;

        route.push({
          pathname,
          query: { ...rest },
        });
      } else {
        route.push({
          pathname,
          query: { ...query, mood },
        });
      }
    }
  };

  const handleAllDiaryClick = () => {
    if (currentUser.role_id === 2) {
      route.push(`/Diary`);
    } else if (currentUser.role_id === 3) {
      route.push(`/Counselor/Diary?userId=${id}`);
    }
  };

  const handleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div
        onClick={handleAccordion}
        className="hover:cursor-pointer text-white/50 flex justify-between"
      >
        <h2 className="px-5 my-5 text-white/50">Filter diary based on mood</h2>
        <button>{isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
      </div>

      {isActive && (
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 pb-5 px-3 ">
          <div
            className="bg-gradient-radial from-purple-400 via-pink-300 to-yellow-200 text-indigo-900"
            onClick={handleAllDiaryClick}
            style={{
              cursor: "pointer",
              border: !selectedMood
                ? "2px solid blue"
                : "2px solid transparent",
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px",
              color: "white",
            }}
          >
            ✨ All diary✨
          </div>
          {moods.map((mood) => (
            <DiaryMoodColor
              onClick={() => handleMoodClick(mood)}
              key={mood}
              mood={mood}
              style={{
                cursor: "pointer",
                backgroundColor: selectedMood === mood ? "#0070f3" : "#f0f0f0",
                border:
                  selectedMood === mood
                    ? "2px solid blue"
                    : "2px solid transparent",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
