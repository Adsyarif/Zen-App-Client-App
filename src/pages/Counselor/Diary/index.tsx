import { DiaryMoodColor } from "@/components/DiaryMoodColor";
import { Navigation } from "@/components/common";

import { useRouter } from "next/router";
import { useGetMood } from "@/api/mood/useGetMood";
import { MoodFilter } from "@/components/DiaryMoodFilter";
import { useGetUserDetailDiaryShare } from "@/api/users/userDetailDiaryShare/useGetUserDetailDiaryShare";

export default function DiaryPage() {
  const route = useRouter();

  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const { diary, diaryByUserId, isLoading, isError } =
    useGetUserDetailDiaryShare();
  const { moodList } = useGetMood();

  const { mood } = route.query;

  if (isLoading) {
    return <div className="text-white">Loading ...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!diary) {
    return (
      <>
        <div>Diary not found</div>
      </>
    );
  }

  const filteredDiaryMood = mood
    ? diaryByUserId.filter((diary) => diary.value === mood)
    : diaryByUserId;

  const moods = moodList.map((item) => item.value);
  console.log(moods);

  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center lg:py-10">
        <div className="w-3/4 rounded-xl bg-leaf p-3 mb-3 m-5 px-5 lg:px-20">
          <h3 className="md:text-4xl lg:text-5xl md:my-10 md:mb-0 lg:mb-0 font-bold text-white">
            User Diary List
          </h3>
          <MoodFilter moods={moods} />

          {filteredDiaryMood.length === 0 && (
            <div className="min-h-52 bg-white rounded-xl m-3 my-5 p-3">
              Diary not found with <strong>{mood} </strong> mood value
            </div>
          )}

          {filteredDiaryMood.map((item) => (
            <>
              <div
                key={item.diary_id}
                className="bg-white rounded-xl m-3 my-5 p-3 hover:cursor-pointer"
              >
                <div
                  onClick={() => {
                    route.push(`/Counselor/Diary/${item.diary_id}`);
                  }}
                >
                  <h3 className="text-right text-lightGreen font-semibold mb-3">
                    {new Date(item.created_at).toLocaleDateString(
                      "en-US",
                      dateFormat
                    )}
                  </h3>
                  <h3 className={`text-lightGreen font-bold mb-5 mt-2 `}>
                    User current mood : <DiaryMoodColor mood={item.value} />
                  </h3>
                  <p className="text-sm">{item.content}</p>
                </div>
                <div
                  className="hover:cursor-pointer"
                  onClick={() => {
                    route.push(`/Profile/${item.account_id}`);
                  }}
                >
                  <p className="text-right text-sm">Written by:</p>
                  <p className="text-right text-sm text-blue-800">
                    - user{item.account_id}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="p-3 px-1 m-5 mx-1 rounded-md"></div>
      </div>
    </>
  );
}
