import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";

export default function HeaderDetailTitle(
  { article }: { article: any }
) {
  return (
    <>
      <p className="text-3xl font-semibold">Featured</p>
      <h2 className="text-4xl font-bold">{article.title}</h2>
      <div className="flex justify-start items-center">
        <Image
          src={"/counselorImg.png"}
          width={320}
          height={120}
          alt={`Profile picture of ${article.author}`}
          className="w-10 h-10 p-1 rounded-full object-cover object-center"
        />
        <h3 className="flex text-base font-semibold">
          {article.author} <RxDotFilled /> {article.created_at}
        </h3>
      </div>
    </>
  );
}
