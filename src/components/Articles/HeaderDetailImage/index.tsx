import Image from "next/image";

export default function HeaderDetailImage() {
  return (
    <Image
      src={"/topArticlesImg.png"}
      width={480}
      height={120}
      alt={`Background picture of top articles `}
      className="w-full h-72 md:h-[500px] md:rounded-xl object-cover object-center"
    />
  );
}
