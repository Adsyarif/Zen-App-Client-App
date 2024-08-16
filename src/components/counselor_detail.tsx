import React from "react";
import Button, { ButtonStyles } from "@/common/button/button";

const CounselorDetail = () => {
  return (
    <div className=" text-black">
      <button className="my-3 mx-7 text-black">◀️ Back</button>
      <div className="flex flex-col sm:flex-row my-3 mx-7 sm:justify-between">
        <div className="flex">
          <img
            className="h-20 w-20 rounded-ful grid-col mr-3"
            src="https://randomuser.me/api/portraits/men/1.jpg"
          />
          <div className="flex flex-col">
            <div className="text-lg font-bold">
              Dr. blabla S.kom, S.krim, S.doger
            </div>
            <div className="text-sm font-semibold">Counseling doctor</div>
            <div>⭐⭐⭐⭐⭐</div>
            <div className="text-sm font-semibold">
              Specialist Mental Health
            </div>
          </div>
        </div>
        <Button
          type="submit"
          ButtonStyle={ButtonStyles.PrimaryButton}
          className="rounded-lg lg:px-5 md:px-5 w-32 "
        >
          Book Now
        </Button>
      </div>
      <div className="mx-7 my-5 md:text-lg">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
        repellat totam aperiam amet iste, impedit, omnis voluptatibus quos
        placeat officia praesentium iusto rem voluptates beatae eum quam ducimus
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
        repellat totam aperiam amet iste, impedit, omnis voluptatibus quos
        placeat officia praesentium iusto rem voluptates beatae eum quam ducimus
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
        repellat totam aperiam amet iste, impedit, omnis voluptatibus quos
        placeat officia praesentium iusto rem voluptates beatae eum quam ducimus{" "}
      </div>
    </div>
  );
};

export default CounselorDetail;
