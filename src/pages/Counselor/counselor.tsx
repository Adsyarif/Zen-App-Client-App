// import { useContext, useState, useEffect } from "react";
// import { AppContext } from "@/providers/AppContext";
// import { API_BASE } from "@/lib/projectApi";
// import axios from "axios";
// import CounselorProfileCard, { CounselorProfileCardProps } from "@/components/Counselor/CounselorProfileCard";
// import CounselorProfileSchedule from "@/components/Counselor/CounselorProfileSchedule";
// import { Navigation } from "@/components/common";
// import { useRouter } from "next/router";

// const CounselorPage = () => {
//   const [counselorData, setCounselorData] = useState<CounselorProfileCardProps["counselorData"] | null>(null);
//   const { currentUser, setCurrentUser } = useContext(AppContext);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCounselorData = async () => {
//       try {
//         if (currentUser?.account_id) {
//           const response = await axios.get(`${API_BASE}/counselor/${currentUser.account_id}`);
//           const { data } = response.data;
//           const email = data.account.email;
//           console.log("data",data)
          
//           setCounselorData({
//             account_id: currentUser.account_id,
//             email,
//             ...data.counselor_details[0],
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching counselor data:", error);
//       }
//     };

//     fetchCounselorData();
//   }, [currentUser]);

//   if (!counselorData) {
//     return <p>Loading...</p>;
//   }
  
//   const LogOut = () => {
//     setCurrentUser(null);
//     localStorage.removeItem("currentUser");
//     router.push("/");
//   };

//   return (
//     <>
//       <Navigation />
//       <div className="my-10 flex flex-col md:flex-row w-full ">
//         <div className="gap-10 flex justify-center flex-col md:flex-row w-full">
//           <CounselorProfileCard onLogout={LogOut} counselorData={counselorData} />
//           <CounselorProfileSchedule />
//         </div>
        
//       </div>
//     </>
//   );
// };

// export default CounselorPage;
