import { useRouter } from "next/router";
import { IoMdArrowRoundBack } from "react-icons/io";

import style from "./custom404.module.css";
import { ReactNode } from "react";
import { Navigation } from "../common";

interface notFoundProps {
  message?: string | ReactNode;
  customPath?: string;
}

export default function Custom404Component(prop: notFoundProps) {
  const { message, customPath } = prop;

  const route = useRouter();

  const handleGoBack = () => {
    {
      customPath ? route.push(`/${customPath}`) : route.back();
    }
  };

  return (
    <>
      <Navigation />
      <div className="bg-leaf w-11/12 p-3 my-5 mx-auto rounded-xl">
        <h3
          onClick={handleGoBack}
          className="font-bold text-white flex gap-3 items-center hover:cursor-pointer"
        >
          <IoMdArrowRoundBack /> Go Back
        </h3>

        <div className="bg-white rounded-xl p-3 m-3 mt-10">
          <div
            className={`h-20 rounded-xl p-3 mt-5 bg-contain bg-no-repeat bg-center ${style.custom404}`}
          >
            {message ? message : "Nothing found"}
          </div>
        </div>
      </div>
    </>
  );
}
