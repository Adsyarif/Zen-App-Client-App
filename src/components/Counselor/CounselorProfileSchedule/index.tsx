import Link from "next/link";
import Image from "next/image"
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import style from "./counselorSched.module.css";
import upcomingScheduleList from "@/data/upcomingScheduleList.json";
import scheduleList from "@/data/scheduleList.json";
import consultationHistorybyCounselor from "@/data/consultationHistorybyCounselor.json";

const CounselorProfileSchedule = () => {
    return (
        <div className="flex flex-col bg-teal-900 w-1/2 m-10 p-5 rounded-md h-fit">
                {/* navigation */}
                <div className="hidden lg:flex gap-3 text-white w-full font-semibold justify-around text-2xl py-3">
                    <Link href={"/counselor_page/post"}>
                        <FaRegComment />
                    </Link>
                    <Link href={"/counselor_page/bookmark"}>
                        <FaRegBookmark />
                    </Link> 
                    <Link href={"/counselor_page/like"} >
                        <AiOutlineLike />
                    </Link>
                    <Link href={"/counselor_page/notification"}>
                        <IoNotificationsOutline />
                    </Link>
                </div>
                {/* upcoming consultation list*/}
                <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
                    <h3 className="font-semibold text-xl mb-2 text-teal-900">Upcoming Consultation</h3>
                    <div className="flex justify-between bg-[#fafaf4] p-2 rounded-md">
                        <div className="flex flex-col p-2 rounded-md">
                            <div className="flex justify-start gap-4">
                                <Image src="/counselorImg.png"
                                    width={120}
                                    height={70}
                                    className="object-cover object-center border-2 border-[#C1D8C3] rounded-full w-14 h-14"
                                    alt="user Image"
                                />
                                <div className="flex flex-col">
                                    <h6 className="font-semibold">Nama user</h6>
                                    <a href="#" className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-full p-.5">Diary</a>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <h6 className="font-semibold">Booked Details</h6>
                                    <p>Booked at: 12 August 2024</p>
                                    <p>Schedule: 01 September 2024 12:00 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <a href="#" className="text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1">Join</a>
                            <a href="#" className="text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1">Reschedule</a>
                            <a href="#" className="text-center text-[#fafaf4] rounded-md bg-teal-900 hover:bg-teal-950 p-1">Done</a>
                            <a href="#" className="text-center text-[#fafaf4] rounded-md bg-red-600 hover:bg-red-700 p-1">Cancel</a>
                        </div>
                    </div>
                </div>
                {/* list schedule */}
                <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
                    <h3 className="font-semibold text-xl mb-2 text-teal-900">List Schedule</h3>
                    <div className="flex bg-[#fafaf4] p-2 rounded-md">
                        <table className={`${style.table} bg-mocca text-xs sm:text-base`}>
                            <thead>
                                <tr>
                                <th>Date of Consultation</th>
                                <th>Counsultation Time</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleList.map((item) => (
                                <tr key={item.schedule_id}>
                                    <td>{item.day}</td>
                                    <td className="py-2 px-4 border-b">
                                        {item.slots.map((slots, i) => (
                                            <div key={i} className="mb-1">
                                                {slots.available_from} - {slots.available_to}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="gap-.2">
                                        <button className="text-center mx-1 text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-md p-1">
                                            edit
                                        </button>
                                        <button className="text-center mx-1 text-[#fafaf4] bg-red-600 hover:bg-red-700 rounded-md p-1">
                                            delete
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
                        <button className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-full p-1">
                            Create Schedule
                        </button>
                    </div>
                </div>
                {/* counsultation histories */}
                <div className="bg-[#C1D8C3] rounded-md m-5 p-5">
                    <h3 className="font-semibold text-xl mb-2 text-teal-900">Counsultation Histories</h3>
                    <div className="flex bg-[#fafaf4] p-2 rounded-md">
                        <table className={`${style.table} bg-mocca text-xs sm:text-base`}>
                            <thead>
                                <tr>
                                <th>Date of Consultation</th>
                                <th>Counsultation Time</th>
                                <th>Users Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultationHistorybyCounselor.map((item) => (
                                <tr key={item.id}>
                                    <td>{new Date(item.date).toLocaleDateString("en-US", dateFormat)}</td>
                                    <td>{item.time}</td>
                                    <td>{item.user_details}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
                        <button className="text-center text-[#fafaf4] bg-teal-600 hover:bg-teal-700 rounded-full p-.5">
                            see more
                        </button>
                    </div>
                </div>
        </div>
    );
};
export default CounselorProfileSchedule;