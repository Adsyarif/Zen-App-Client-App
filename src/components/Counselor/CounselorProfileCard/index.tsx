import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/providers/AppContext";
import { API_BASE } from "@/lib/projectApi";
import axios from "axios";
import EditModal from "@/components/profile/editModal";

const CounselorProfileCard = () => {
    const [counselorData, setCounselorData] = useState<any>(null);
    const { currentUser } = useContext(AppContext);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    useEffect(() => {
        const fetchCounselorData = async () => {
            try {
                const response = await axios.get(`${API_BASE}/counselor_details/${currentUser?.account_id}`);
                const data = response.data.data;
                setCounselorData({
                    email: data.account.email,
                    ...data.counselor_details[0],
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (currentUser?.account_id) {
            fetchCounselorData();
        } else {
            setCounselorData({
                username: "doktostone",
                first_name: "Senku",
                last_name: "Ishigami",
                title: "M.Psi",
                certification: "Konsultan Psikologi bidang SDM",
                phone_number: "628325553789",
                gender_name: "male"
            });
        }
    }, [currentUser]);

    const handleSave = async (updatedData: any) => {
        try {
            const { email, ...dataToUpdate } = updatedData;
            await axios.put(`${API_BASE}/counselor_details/${currentUser?.account_id}`, updatedData);
            setCounselorData((prevData: any) => prevData ? {
                ...prevData,
                ...dataToUpdate,
            } : {
                email,
                ...dataToUpdate,
            });

            setModalVisible(false);
            setModalVisible(false);
        } catch (error) {
            console.error("Error saving counselor data:", error);
        }
    };

    if (!counselorData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col gap-3 bg-teal-900 w-1/3 m-10 p-10 rounded-md h-fit">
            <div className="flex justify-center w-full">
                <Image
                    src="/counselorImg.png"
                    width={320}
                    height={120}
                    className="object-cover object-center rounded-full border-8 border-[#C1D8C3] rounded-full w-24 h-24"
                    alt="Counselor Image"
                />
            </div>
            <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
                <p>username:</p>
                <p>{counselorData.username}</p>
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
                <p>certification:</p>
                <p>{counselorData.certification}</p>
            </div>
            <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
                <p>gender:</p>
                <p>{counselorData.gender_name}</p>
            </div>
            <div className="flex flex-row justify-end gap-3 text-slate-50 mt-3">
                <button onClick={toggleModal} className="bg-teal-600 rounded-xl p-1 px-5">
                    Edit
                </button>
            </div>
            {isModalVisible && (
                <EditModal
                    isVisible={isModalVisible}
                    onClose={toggleModal}
                    userData={counselorData}
                    onSave={handleSave}
                />
            )}
        </div>
    )
}
export default CounselorProfileCard;