import DiaryEntryContainer from "@/components/diary_entry_container";
import MoodPickerComponent from "@/components/mood_picker";
import DatePicker from "@/components/common/DatePicker";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/common";
import { useRouter } from "next/router";
import { API_BASE } from "@/lib/projectApi";
import { AppContext, MoodStatus } from "@/providers/AppContext";
import axios from "axios";

const DiaryEntryPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [moodCategories, setMoodCategories] = useState<MoodStatus[]>([]);
  
  useEffect(() => {
    const fetchMood = async () => {
      try {
        const response = await axios.get(`${API_BASE}/mood_status`);
        const mood = response.data.data
        console.log(mood)
        setMoodCategories(mood);
      } catch (error) {
        console.error("Error fetching genders:", error);
      }
    };
    fetchMood();
  }, []);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <>
    <Navigation/>
    <div className="md:flex md:flex-row justify-between gap-5 p-8 lg:mx-32 lg:mb-24 items-start">
      <div className="w-full">
      <DiaryEntryContainer />
      </div>
      
      <div className="flex flex-col gap-10">
        <div className="hidden md:block">
          <DatePicker
            type="date"
            label="Select Date"
            onChange={handleDateChange}
          />
        </div>
        <MoodPickerComponent moodCategories={moodCategories} />
      </div>
    </div>
    </>
    
  );
};

export default DiaryEntryPage;
