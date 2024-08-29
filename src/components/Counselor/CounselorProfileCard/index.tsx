import Image from "next/image";
import { useState } from "react";
import EditModal from "@/components/profile/editModalControler";
import ReactStars from "react-stars";

export interface CounselorProfileCardProps {
  counselorData: {
    account_id: number;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    title: string;
    phone_number: string;
    certification: string;
    gender_name: string;
    practice_license_status: string;
    practice_location: string;
    price: number;
    year_of_experience: number;
    alumnus: string[];
  };
  onLogout: () => void;
  onSave: (updatedData: any) => void; 
  rating: number;
}

const CounselorProfileCard = ({ counselorData, onLogout, onSave, rating }: CounselorProfileCardProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState(rating);
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSaveClick = (updatedData: any) => {
    onSave(updatedData);
    setModalVisible(false);
  };

  return (
    <div className=" flex flex-col gap-3 bg-teal-900 md:w-1/3 w-full p-10 rounded-md h-fit">
      <div className="flex flex-col justify-center w-full">
        <image className="flex justify-center">
          <Image
            src="/counselorImg.png"
            width={320}
            height={120}
            className="flex justify-center object-cover object-center border-8 border-[#C1D8C3] rounded-full w-24 h-24"
            alt="Counselor Image"
          />
        </image>
         <div className="flex justify-center">
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={currentRating}
              onChange={(newRating: number) => setCurrentRating(newRating)}
            />
          </div>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>username:</p>
        <p>{counselorData.user_name}</p>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>counselor name:</p>
        <p>{`${counselorData.first_name} ${counselorData.last_name}`}</p>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>title:</p>
        <p>{counselorData.title}</p>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>phone number:</p>
        <p>{counselorData.phone_number}</p>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>gender:</p>
        <p>{counselorData.gender_name}</p>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>Alumnus:</p>
        <ul className="list-disc pl-5">
          {counselorData.alumnus.map((alumni, index) => (
            <li key={index}>{alumni}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>certification:</p>
        <p>{counselorData.certification}</p>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>Practice license:</p>
        <p>{counselorData.practice_license_status}</p>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>Year of experience:</p>
        <p>{counselorData.year_of_experience}</p>
      </div>
      <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
        <p>Price:</p>
        <p>{counselorData.price}</p>
      </div>
      <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
        <button onClick={toggleModal} className="bg-teal-600 rounded-xl p-1 px-5">
          Edit
        </button>
        <button onClick={onLogout} className="bg-red-400 rounded-xl p-1 px-5">
            Logout
        </button>
      </div>
      {isModalVisible && (
        <EditModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          counselorData={counselorData}
          onSave={handleSaveClick}
        />
      )}
    </div>
  );
};

export default CounselorProfileCard;
