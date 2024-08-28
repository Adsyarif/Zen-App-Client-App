import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "@/lib/projectApi";
import { useRouter } from "next/router";
import Image from "next/image";
import profileImage from "@/assets/img/user-profile.png";
import EditModal from "../editModal";
import { AppContext } from "@/providers/AppContext";

const UserProfileBiodataCard = () => {
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
        const response = await axios.get(
          `${API_BASE}/user_details/${currentUser?.account_id}`
        );
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
      await axios.put(
        `${API_BASE}/user_details/${currentUser?.account_id}`,
        updatedData
      );
      setUserData((prevData: any) =>
        prevData
          ? {
              ...prevData,
              ...dataToUpdate,
            }
          : {
              email,
              ...dataToUpdate,
            }
      );

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
          <button
            onClick={toggleModal}
            className="bg-teal-600 rounded-xl p-1 px-5"
          >
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
    </>
  );
};
export default UserProfileBiodataCard;
