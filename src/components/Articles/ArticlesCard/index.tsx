import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";

interface ArticlesCardProps {
  article: any;
  onCardClick: (articleTitle: number) => void;
}

const summary = (text: string, maxLength = 160): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function ArticlesCard({ article, onCardClick }: ArticlesCardProps) {

  return (
    <button onClick={() => onCardClick(article.id)} className="w-full md:w-72 p-2 flex flex-col">
      <Image
        src={"/articleImage.png"}
        width={320}
        height={120}
        alt={`Profile picture of ${article.title}`}
        className="w-full h-64 md:h-80 p-1 mb-4 object-cover object-center"
      />
      <div className="text-black">
        <h2 className="text-xl font-semibold">{article.title}</h2>
        <p className="min-h-[80px] text-sm mt-2">{summary(article.summary)}</p>
        <div className="flex justify-start items-center">
          <Image
            src={"/counselorImg.png"}
            width={320}
            height={120}
            alt={`Profile picture of ${article.author}`}
            className="w-12 h-12 p-1 rounded-full object-cover object-center"
          />
          <h3 className="flex font-semibold">
            {article.author} <RxDotFilled /> {article.published_date}
          </h3>
        </div>
      </div>
    </button>
  );
}
