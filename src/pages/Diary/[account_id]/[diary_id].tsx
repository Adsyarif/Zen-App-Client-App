import DiaryEntryContainer from "@/components/diary_entry_container";
import MoodPickerComponent from "@/components/mood_picker";
import DatePicker from "@/components/common/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState, useContext  } from "react";
import { Navigation } from "@/components/common";
import { API_BASE } from "@/lib/projectApi";
import axios from "axios";
import { MoodStatus } from "@/providers/AppContext";
import { AppContext } from "@/providers/AppContext";
import { useRouter } from "next/router";


const DiaryIDPage = () => {
  const { currentUser } = useContext(AppContext); 
  const accountId = currentUser?.account_id;
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [moodCategories, setMoodCategories] = useState<MoodStatus[]>([]);
  const [selectMoodStatus, setSelectMoodStatus] = useState<number | null>(null);
  const [moodText, setMoodText] = useState<string>("");
  const [diaryText, setDiaryText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { account_id, diary_id  } = router.query;
  // const diaryId = diary_id ? parseInt(diary_id as string, 10) : null;
  const dateUpdate = selectedDate ? selectedDate.toISOString() : null;
  
  
  useEffect(() => {
    const fetchMood = async () => {
      try {
        const response = await axios.get(`${API_BASE}/mood_status`);
        const mood = response.data.data;
        setMoodCategories(mood);
      } catch (error) {
        console.error("Error fetching genders:", error);
      }
    };
    fetchMood();
  }, []);

  useEffect(() => {
    if (diary_id && account_id) {
      const fetchDiaryEntry = async () => {
        try {
          const response = await axios.get(`${API_BASE}/diary/${account_id}/${diary_id}`);
          const { content, mood_status_id, mood_text, value, created_at } = response.data.data;
          
          setDiaryText(content);
          setMoodText(value);
  
          const selectedMood = moodCategories.find(mood => mood.status_id === mood_status_id);
          if (selectedMood) {
            setSelectMoodStatus(selectedMood.status_id);
            setMoodText(selectedMood.value); 
          }

          const date = dayjs(created_at); 
          setSelectedDate(date);

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching diary entry:", error);
          alert("Error fetching diary entry");
        }
      };
      fetchDiaryEntry();
    } else {
      setIsLoading(false);
    }
  }, [diary_id, accountId, moodCategories]);
  
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleMoodChange = (id: number, mood: string) => {
    setSelectMoodStatus(id);
    setMoodText(mood);
  };

  const createDiaryEntry = async () => {
    if (!selectMoodStatus || !diaryText || !accountId) {
      alert("Please select a mood and enter some text before saving.");
      return;
    }
  const editDiaryEntry = async () => {
    if (!selectMoodStatus || !diaryText || !accountId || !dateUpdate) {
      alert("Please select a mood and enter some text before saving.");
      return;
    }
  
    const updatedDiary = {
      updated_diary: dateUpdate,
      mood_status_id: selectMoodStatus,
      content: diaryText,
    };
  
    try {
      if (diary_id) {
        await axios.put(`${API_BASE}/diary/${accountId}/${diary_id}/edit`, updatedDiary);
        alert("Update Diary is Success!");
      } else {
        await axios.post(`${API_BASE}/diary/${accountId}/create`, updatedDiary);
        alert("Create New Diary Success!");
      }
      router.push("/Diary");
    } catch (error) {
      console.error("Error saving diary entry:", error);
      alert("Terjadi kesalahan saat menyimpan diary.");
    }
  };
    

  const deleteDiaryEntry = async () => {
    try {
      if (!diary_id) {
        alert("Diary ID is missing.");
        return;
      }
      if (!accountId) {
        alert("User is not logged in.");
        return;
      }
      await axios.delete(`${API_BASE}/diary/${accountId}/${diary_id}/delete`, {
      });
      alert("Post deleted successfully.");
      router.push("/Diary")
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  

  return (
    <>
      <Navigation />
      <div className="md:flex md:flex-row justify-between gap-5 p-8 lg:mx-32 lg:mb-24 items-start">
        <div className="w-full">
          <DiaryEntryContainer 
            selectedDate={selectedDate}
            selectMoodStatus={selectMoodStatus}
            moodText={moodText}
            diaryText={diaryText}
            setMoodText={setMoodText}
            setDiaryText={setDiaryText}
            setSelectedDate={setSelectedDate}
            onSave={createDiaryEntry}
            onEdit={editDiaryEntry}
            onDelete={deleteDiaryEntry}
            diaryId={null} 
            />
        </div>
        <div className="flex flex-col gap-10">
          <div className="hidden md:block">
            <DatePicker
              type="date"
              label="Select Date"
              onChange={handleDateChange}
            />
          </div>
          <MoodPickerComponent
            moodCategories={moodCategories}
            onMoodChange={handleMoodChange} 
          />
        </div>
      </div>
    </>
  );
};
}
export default DiaryIDPage
