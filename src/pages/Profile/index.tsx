import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import style from "./profile.module.css";
import Image from "next/image";
import profileImage from "@/assets/img/user-profile.png";
import { Navigation } from "@/components/common";
import { AppContext } from "@/providers/AppContext";
import { API_BASE } from "@/lib/projectApi";

import consultationOngoing from "@/data/consultationOngoing.json";
import consulationHistory from "@/data/consultationHistory.json";
import EditModal from "@/components/profile/editModal";
import Link from "next/link";
import { useRouter } from "next/router";

export interface DataPairProps {
  label: string;
  data: string;
}

export const DataPair = (props: DataPairProps) => {
  const { label, data } = props;

  return (
    <div className="bg-lightGreen text-white rounded-md p-1 px-3 my-2 flex w-full justify-between gap-3">
      <div className="flex items-start justify-start w-2/5">
        <p>{label}</p>
      </div>
      <div className="flex justify-start items-start w-3/5">
        <p>{data}</p>
      </div>
    </div>
  );
};

const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/user_details/${currentUser?.account_id}`);
        const data = response.data.data;
        setUserData({
          email: data.account.email,
          ...data.user_details[0],
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (currentUser?.account_id) {
      fetchUserData();
    }
  }, [currentUser]);

  const handleSave = async (updatedData: any) => {
    try {
      const { email, ...dataToUpdate } = updatedData;
      await axios.put(`${API_BASE}/user_details/${currentUser?.account_id}`, updatedData);
      setUserData((prevData: any) => prevData ? {
        ...prevData,
        ...dataToUpdate,
      } : {
        email,
        ...dataToUpdate,
      });
  
      setModalVisible(false);
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  const LogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  return (
    <>
      <Navigation />
      <div className="flex flex-col lg:flex-row lg:mx-24 mx-12">
        {/* notif bar on mobile */}
        <div className="lg:hidden flex gap-3 text-white font10-semibold justify-around text-2xl py-3 bg-darkGreen rounded-md mx-3">
          
          <Link href={"/Profile/post"}>
            <FaRegComment />
          </Link>
          <Link href={"/Profile/bookmark"}>
            <FaRegBookmark />
          </Link> 
          <Link href={"/Profile/like"} >
            <AiOutlineLike />
          </Link>
          <Link href={"/Profile/notification"}>
            <IoNotificationsOutline />
          </Link>
          
        </div>

        {/* profile data left */}
        <div className="bg-teal-900 lg:w-full h-fit pb-20 rounded-md p-3 m-3 flex flex-col">
          <div className="flex flex-col items-center">
            <div className="rounded-full size-20 bg-lightGreen flex items-center border-4 border-lightGreen">
              <Image src={profileImage} alt="profile image" />
            </div>
          </div>
          {/* Biodata */}
          <div>
            <div className="bg-lightGreen text-white rounded-md p-1 px-3 my-2 flex w-full justify-between gap-3">
              <div className="flex items-start justify-start w-2/5">
                <p>First Name</p>
              </div>
              <div className="flex justify-start items-start w-3/5">
                <p>{userData.first_name}</p>
              </div>
            </div>
            <div className="bg-lightGreen text-white rounded-md p-1 px-3 my-2 flex w-full justify-between gap-3">
              <div className="flex items-start justify-start w-2/5">
                <p>Last Name</p>
              </div>
              <div className="flex justify-start items-start w-3/5">
                <p>{userData.last_name}</p>
              </div>
            </div>
            <div className="bg-lightGreen text-white rounded-md p-1 px-3 my-2 flex w-full justify-between gap-3">
              <div className="flex items-start justify-start w-2/5">
                <p>Username</p>
              </div>
              <div className="flex justify-start items-start w-3/5">
                <p>{userData.user_name}</p>
              </div>
            </div>
            <div className="bg-lightGreen text-white rounded-md p-1 px-3 my-2 flex w-full justify-between gap-3">
              <div className="flex items-start justify-start w-2/5">
                <p>Phone number</p>
              </div>
              <div className="flex justify-start items-start w-3/5">
                <p>{userData.phone_number}</p>
              </div>
            </div>
            <div className="bg-lightGreen text-white rounded-md p-1 px-3 my-2 flex w-full justify-between gap-3">
              <div className="flex items-start justify-start w-2/5">
                <p>Email</p>
              </div>
              <div className="flex justify-start items-start w-3/5">
                <p>{userData.email}</p>
              </div>
            </div>
            <div className="bg-lightGreen text-white rounded-md p-1 px-3 my-2 flex w-full justify-between gap-3">
              <div className="flex items-start justify-start w-2/5">
                <p>Gender</p>
              </div>
              <div className="flex justify-start items-start w-3/5">
                <p>{userData.gender_name}</p>
              </div>
            </div>
          </div>
          {/* button edit delete */}
          <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
            <button onClick={toggleModal} className="bg-teal-600 rounded-xl p-1 px-5">
              Edit
            </button>

            <button onClick={LogOut} className="bg-red-400 rounded-xl p-1 px-5">
              Logout
            </button>
          </div>
          {isModalVisible && (
            <EditModal
              isVisible={isModalVisible}
              onClose={toggleModal}
              userData={userData}
              onSave={handleSave}
            />
          )}
        </div>

        {/* consultation data */}
        <div className="bg-teal-900 rounded-md p-3 pb-10 m-3">
          {/* notif bar on desktop */}
          <div className="hidden lg:flex gap-3 text-white w-full font-semibold justify-around text-2xl py-3">
            
            <Link href={"/Profile/post"}>
              <FaRegComment />
            </Link>
            <Link href={"/Profile/bookmark"}>
              <FaRegBookmark />
            </Link> 
            <Link href={"/Profile/like"} >
              <AiOutlineLike />
            </Link>
            <Link href={"/Profile/notification"}>
              <IoNotificationsOutline />
            </Link>
           
          </div>
          {/* consulation bar */}
          <div>
            <div className="text-lg font-medium">
              <DataPair label={"Psychologist in charge:"} data={"Dr Blabla"} />
            </div>
            <div className="text-lg font-medium">
              <DataPair label={"User Emergency Contact"} data={"0888888888"} />
            </div>
            {/* ongoing consultation */}
            <div className="text-white bg-lightGreen rounded-md px-5 py-7">
              <h3 className="font-semibold text-xl mb-5">Ongoing Consultation</h3>
              <div>
                <table className={`${style.table} bg-mocca text-xs sm:text-base`}>
                  <thead>
                    <tr>
                      <th>Date of Consultation</th>
                      <th>Psychologist in Charge</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultationOngoing.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {new Date(item.date).toLocaleDateString("en-US", dateFormat)}
                        </td>
                        <td>{item.psychologist}</td>
                        <td>{item.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* consultation history */}
            <div className="text-white bg-lightGreen mt-5 rounded-md px-5 py-7">
              <h3 className="font-semibold text-xl mb-5">Consultation Histories</h3>
              <div>
                <table className={`${style.table} bg-mocca text-xs sm:text-base`}>
                  <thead>
                    <tr>
                      <th>Date of Consultation</th>
                      <th>Psychologist in Charge</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consulationHistory.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {new Date(item.date).toLocaleDateString("en-US", dateFormat)}
                        </td>
                        <td>{item.psychologist}</td>
                        <td>{item.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
