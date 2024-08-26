import diaryData from "@/data/counselorDiaryData.json";
import { useRouter } from "next/router";
import { IoMdArrowRoundBack } from "react-icons/io";

import style from "./diary.module.css";
import { DiaryMoodColor } from "@/components/DiaryMoodColor";
import { Navigation } from "@/components/common";
import Custom404Component from "@/components/Custom404Component";
import { useGetDiary } from "@/api/diary/useGetDiary";

export default function DiaryDetail() {
  const route = useRouter();

  const handleGoBackDiaryList = () => {
    route.push("/Counselor/Diary");
  };

  const { sharedDiary, isLoading } = useGetDiary();

  const { id } = route.query;

  const diaryId = typeof id === "string" ? parseInt(id) : null;

  const diaryDetail = sharedDiary.find((diary) => diary.diary_id === diaryId);

  if (isLoading) {
    return <Custom404Component message="Loading ..." />;
  }

  console.log(diaryData);
  if (!diaryDetail) {
    return (
      <>
        <Custom404Component
          customPath="/Counselor/Diary"
          message="Diary Not Found"
        />
      </>
    );
  }

  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <Navigation />
      <div className="bg-leaf w-3/4 p-3 m-5 rounded-xl">
        <h3
          onClick={handleGoBackDiaryList}
          className="font-bold text-white flex gap-3 items-center hover:cursor-pointer"
        >
          <IoMdArrowRoundBack /> Diary List
        </h3>
        <h3 className="text-center text-white font-bold my-3 mb-5">
          Diary Entry
        </h3>

        <div className="bg-white rounded-xl p-3 m-3">
          <h3 className="text-lightGreen font-semibold">
            {" "}
            {new Date(diaryDetail?.created_at).toLocaleDateString(
              "en-US",
              dateFormat
            )}
          </h3>
          <h3 className="text-lightGreen font-bold mb-2 mt-2">
            User current mood : <DiaryMoodColor mood={diaryDetail.value} />
          </h3>
          <div
            className="hover:cursor-pointer"
            onClick={() => route.push(`/Profile/${diaryDetail.account_id}`)}
          >
            <p className="text-right text-sm">Written by:</p>
            <p className="text-right text-sm text-blue-800">
              - {diaryDetail.account_id}
            </p>
          </div>
          <div
            className={`max-h-96 overflow-y-scroll rounded-xl p-3 mt-5 bg-contain bg-no-repeat bg-center ${style.diaryDetail}`}
          >
            <p className="text-sm mt-3">{diaryDetail.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}
