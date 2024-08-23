import DiaryEntryContainer from "@/components/diary_entry_container";
import MoodPickerComponent from "@/components/mood_picker";
import DatePicker from "@/components/common/DatePicker";
import { Dayjs } from "dayjs";
import { useEffect, useState, useContext } from "react";
import { Navigation } from "@/components/common";
import { API_BASE } from "@/lib/projectApi";
import axios from "axios";
import { MoodStatus } from "@/providers/AppContext";
import { AppContext } from "@/providers/AppContext";
import { useRouter } from "next/router";
import DropdownTripleDotsMenu from "@/components/dropdown_triple_dots";

const DiaryEntryPage = () => {
  const { currentUser } = useContext(AppContext);
  const accountId = currentUser?.account_id;
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [moodCategories, setMoodCategories] = useState<MoodStatus[]>([]);
  const [selectMoodStatus, setSelectMoodStatus] = useState<number | null>(null);
  const [moodText, setMoodText] = useState<string>("");
  const [diaryText, setDiaryText] = useState<string>("");
  const [diaryId, setDiaryId] = useState<number | null>(null); // Ensure diaryId is set when needed

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const response = await axios.get(`${API_BASE}/mood_status`);
        const mood = response.data.data;
        setMoodCategories(mood);
      } catch (error) {
        console.error("Error fetching moods:", error);
      }
    };
    fetchMood();
  }, []);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleMoodChange = (id: number, mood: string) => {
    setSelectMoodStatus(id);
    setMoodText(mood);
  };

  const createDiaryEntry = async () => {
    if (!selectMoodStatus || !diaryText || !accountId || !selectedDate) {
      alert("Please select a mood and enter some text before saving.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/diary/${accountId}/create`, {
        mood_status_id: selectMoodStatus,
        content: diaryText,
        created_at: selectedDate.toISOString(),
      });
      setDiaryId(response.data.diary_id); 
      alert("Create New Diary Success!");
      console.log("result", response);
      router.push("/Diary");
    } catch (error) {
      console.error("Error creating diary entry:", error);
      alert("Terjadi kesalahan saat menyimpan diary.");
    }
  };

  const editDiaryEntry = async () => {
    if (!diaryId || !selectMoodStatus || !diaryText || !accountId || !selectedDate) {
      alert("Please select a mood and enter some text before saving.");
      return;
    }

    try {
      await axios.put(`${API_BASE}/diary/${accountId}/${diaryId}/edit`, {
        mood_status_id: selectMoodStatus,
        content: diaryText,
        created_at: selectedDate.toISOString(),
      });
      alert("Diary entry updated successfully!");
    } catch (error) {
      console.error("Error editing diary entry:", error);
      alert("Terjadi kesalahan saat mengedit diary.");
    }
  };
  

  const deleteDiaryEntry = async (diary_id: number | null) => {
    try {
      if (!diary_id) {
        alert("Diary ID is missing.");
        return;
      }

      if (!accountId) {
        alert("User is not logged in.");
        return;
      }

      await axios.post(`${API_BASE}/diary/${accountId}/${diary_id}/delete`, {
        // account_id: currentUser?.account_id,
      });

      alert("Post deleted successfully.");
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
            setDiaryText={setDiaryText}
            setMoodText={setMoodText}
            onSave={createDiaryEntry}
            onEdit={editDiaryEntry}
            diaryId={diaryId}
            onDelete={() => deleteDiaryEntry(diaryId)}
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
          
            {/* <DropdownTripleDotsMenu
              onSave={createDiaryEntry}
              onDelete={() => deleteDiaryEntry(diaryId)} 
            /> */}
          
         
        </div>
      </div>
    </>
  );
};

export default DiaryEntryPage;
