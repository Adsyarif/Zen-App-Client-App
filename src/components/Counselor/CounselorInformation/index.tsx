import { avgRate, renderStars } from "@/utils/startsReview";

const CounselorInformation = ({ counselor, review }: any) => {
  console.log(review);
  return (
    <div className="flex flex-col sm:flex-row my-3 mx-7 sm:justify-between">
      <div className="flex gap-8">
        <img
          className="h-48 w-48 rounded-full self-center shadow-2xl"
          src="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <div className="flex flex-col self-center gap-2">
          <div className="text-2xl font-bold">
            {counselor.first_name} {counselor.last_name}
          </div>
          <div className="text-xl font-semibold">{counselor.title}</div>
          <div className="flex items-center gap-5">
            <p className="bg-leaf rounded rounded-xl text-mocca px-2 py-1 text-xl">
              {counselor.year_of_experience} years
            </p>
            <p className="bg-leaf rounded rounded-xl text-xl text-mocca px-2 py-1">
              {renderStars(avgRate(review))}
            </p>
          </div>
          <div className="text-xl font-bold">Alumni</div>
          {counselor.alumnus.map((alumn: string, index: number) => (
            <ul key={index} className="text-lg">
              <li className="p-0">{alumn}</li>
            </ul>
          ))}
          <div className="text-xl font-bold">Practice In</div>
          <div className="text-lg ">{counselor.practice_location}</div>
          <div className="text-xl font-bold">STR Number</div>
          <div className="text-lg ">{counselor.practice_license_status}</div>
        </div>
      </div>
      <button className="rounded-lg lg:px-5 md:px-5 bg-leaf text-mocca self-start h-12">
        Book Now
      </button>
    </div>
  );
};

export default CounselorInformation;
