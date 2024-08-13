import DiaryEntryContainer from "@/components/diary_entry_container";
import MoodPickerComponent from "@/components/mood_picker";

const DiaryEntryPage = () => {
  return (
    <div className="md:flex md:flex-row justify-between gap-5 p-8 lg:mx-32 lg:mb-24 items-center">
      <DiaryEntryContainer />
      <MoodPickerComponent />
    </div>
  );
};

export default DiaryEntryPage;
