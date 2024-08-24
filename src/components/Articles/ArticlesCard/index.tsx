import { ArticleProps } from "@/pages/Articles";
import dayjs from "dayjs";
import Image from "next/image";
import { RxDotFilled } from "react-icons/rx";

interface ArticlesCardProps {
  article: ArticleProps;
  onCardClick: (id: number) => void;
}

const title = (text: string, maxLength = 40): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const summary = (text: string, maxLength = 120): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function ArticlesCard({ article, onCardClick }: ArticlesCardProps) {

  return (
    <button onClick={() => onCardClick(article.article_id)} className="w-full md:w-72 p-2 flex flex-col">
      <Image
        src={"/articleImage.png"}
        width={320}
        height={120}
        alt={`Profile picture of ${article.title}`}
        className="w-full h-64 md:h-80 p-1 mb-4 object-cover object-center"
      />
      <div className="text-black">
        <h2 className="text-xl font-semibold">{title(article.title)}</h2>
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
            {article.author} <RxDotFilled /> {dayjs(article.created_at).format("DD-MMMM-YYYY")}
          </h3>
        </div>
      </div>
    </button>
  );
}
