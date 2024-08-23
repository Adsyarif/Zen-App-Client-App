import Image from "next/image";

const CounselorProfileCard = () => {
    return (
        <div className="flex flex-col gap-3 bg-[#22543D] w-1/3 m-10 p-10 rounded-md">
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
                <div>counselor name :</div>
                <div>Dr.Blabla</div>
            </div>
            <div className="flex justify-between w-full bg-[#C1D8C3] p-2 rounded-md">
                <div>phone number :</div>
                <div>08111233333</div>
            </div>            
        </div>
    )
}
export default CounselorProfileCard;