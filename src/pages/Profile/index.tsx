import { Navigation } from "@/components/common";
import UserUpcomingConsultation from "@/components/profile/userUpcomingConsultation";
import UserConsultationHistories from "@/components/profile/userConsultationHistories";
import UserProfileBiodataCard from "@/components/profile/userProfileBiodataCard";
import NotifBarOnDesktop from "@/components/profile/notifBarOnDesktop";
import NotifBarOnMobile from "@/components/profile/notifBarOnMobile";
import MoodTracker from "@/components/profile/moodTracker";

export default function UserProfilePage() {
  return (
    <>
      <Navigation />
      <div className="flex h-min-screen mb-10 flex-col lg:flex-row gap-5 lg:mx-24 mx-5">
        <div className="flex flex-col lg:w-[70%]">
          <NotifBarOnMobile />
          <UserProfileBiodataCard />
          <MoodTracker />
        </div>

        <div className="bg-teal-900 w-full rounded-md p-3 pb-10 my-3 ">
          <NotifBarOnDesktop />
          <div>
            <UserUpcomingConsultation />
            <UserConsultationHistories />
          </div>
        </div>
      </div>
    </>
  );
}
