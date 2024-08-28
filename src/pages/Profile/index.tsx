import { Navigation } from "@/components/common";
import UserUpcomingConsultation from "@/components/profile/userUpcomingConsultation";
import UserConsultationHistories from "@/components/profile/userConsultationHistories";
import UserProfileBiodataCard from "@/components/profile/userProfileBiodataCard";
import NotifBarOnDesktop from "@/components/profile/notifBarOnDesktop";
import NotifBarOnMobile from "@/components/profile/notifBarOnMobile";

export default function UserProfilePage() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col lg:flex-row lg:mx-24 mx-12">
        <NotifBarOnMobile />
        <UserProfileBiodataCard />

        <div className="bg-teal-900 rounded-md p-3 pb-10 m-3">
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
