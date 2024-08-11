import { GoTriangleDown } from "react-icons/go";

export default function HeaderArticles() {
  return (
    <div className=" flex justify-between items-center">
      <div className="font-bold text-xl">Recent article post</div>
      <div className="bg-[#22543D] px-6 py-1 text-white font-bold flex items-center rounded-lg ">
        Find Articles   
        <GoTriangleDown size={24} />
      </div>
    </div>
  );
}
