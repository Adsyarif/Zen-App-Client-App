import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";

import Image from "next/image";

import style from "./profile.module.css";

import consultationOngoing from "@/data/consultationOngoing.json";
import consulationHistory from "@/data/consultationHistory.json";
import profileData from "@/data/profileData.json";

import profileImage from "@/assets/img/user-profile.png";
import { Navigation } from "@/components/common";

export interface DataPairProps {
  label: string;
  data: string;
}

export const DataPair = (props: DataPairProps) => {
  const { label, data } = props;

  return (
    <>
      <div className="bg-lightGreen text-white rounded-md p-1 px-3 my-2 flex w-full justify-between gap-3">
        <div className="flex items-start justify-start w-2/5">
          <p>{label}</p>
        </div>
        <div className="flex justify-start items-start w-3/5">
          <p>{data}</p>
        </div>
      </div>
    </>
  );
};

const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function ProfilePage() {
  return (
    <>
      <Navigation/>
      <div className="flex flex-col lg:flex-row lg:mx-12">
        {/* notif bar on mobile */}
        <div className="lg:hidden flex gap-3 text-white font-semibold justify-around text-2xl py-3  bg-darkGreen rounded-md mx-3">
          <FaRegComment />
          <FaRegBookmark />
          <AiOutlineLike />
          <IoNotificationsOutline />
        </div>

        {/* profile data left */}
        <div className="bg-teal-900 lg:w-full h-fit pb-20 rounded-md p-3 m-3 flex flex-col ">
          <div className="flex flex-col items-center">
            <div className="rounded-full size-20 bg-lightGreen flex items-center border-4 border-lightGreen">
              <Image src={profileImage} alt="profile image" />
            </div>
          </div>
          {/* Biodata  */}
          <div className="">
            <DataPair label={"Name"} data={profileData.name} />
            <DataPair label={"Date of Birth"} data={"January 1st, 1999"} />
            <DataPair
              label={"Phone number"}
              data={profileData["phone-number"]}
            />
            <DataPair label={"Email"} data={profileData.email} />
            <DataPair label={"Gender"} data={profileData.gender} />
            <DataPair label={"Address"} data={profileData.address} />
          </div>
          {/* button edit delete  */}
          <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
            <button className="bg-teal-600 rounded-xl p-1 px-5">Edit</button>
            <button className="bg-teal-600 rounded-xl p-1 px-5">Delete</button>
          </div>
        </div>

        {/* consultation data  */}
        <div className="bg-teal-900 rounded-md p-1 m-3">
          {/* notif bar on desktop */}
          <div className="hidden lg:flex gap-3 text-white w-full font-semibold justify-around text-2xl py-3">
            <FaRegComment />
            <FaRegBookmark />
            <AiOutlineLike />
            <IoNotificationsOutline />
          </div>
          {/* consulation bar */}
          <div>
            <div className="text-lg font-medium">
              <DataPair label={"Psychologist in charge:"} data={"Dr Blabla"} />
            </div>
            <div className="text-lg font-medium">
              <DataPair label={"User Emergency Contact"} data={"0888888888"} />
            </div>

            {/* ongoing consultation  */}
            <div className="text-white bg-lightGreen rounded-md px-5 py-7">
              <h3 className="font-semibold text-xl mb-5">
                Ongoing Consultation
              </h3>
              <div>
                <table
                  className={`${style.table} bg-mocca text-xs sm:text-base`}
                >
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
                          {new Date(item.date).toLocaleDateString(
                            "en-US",
                            dateFormat
                          )}
                        </td>
                        <td>{item.psychologist}</td>
                        <td>{item.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* consultation history  */}
            <div className="text-white bg-lightGreen mt-5 rounded-md px-5 py-7">
              <h3 className="font-semibold text-xl mb-5">
                Consultation Histories
              </h3>
              <div className="">
                <table
                  className={`${style.table} bg-mocca text-xs sm:text-base`}
                >
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
                          {new Date(item.date).toLocaleDateString(
                            "en-US",
                            dateFormat
                          )}
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
