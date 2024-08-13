import { GetStaticProps, GetStaticPaths } from "next";
import articlesData from "@/data/articlesData.json";
import BackButton from "@/components/Articles/BackButton";
import HeaderDetailTitle from "@/components/Articles/HeaderDetailTitle";
import HeaderDetailImage from "@/components/Articles/HeaderDetailImage";
import SelectionSection from "@/components/Articles/SelectionSection";
import ShareArticle from "@/components/Articles/ShareArticle";
import ArticleDescription from "@/components/Articles/ArticleDescription";
import ArticlesCard from "@/components/Articles/ArticlesCard";
import { useRouter } from "next/router";
import data from "@/data/articlesData.json";
import { Navigation } from "@/components/common";


interface Content {
  sub_title: string;
  paragraph: string;
}

interface ArticlesData {
  id: number;
  title: string;
  author: string;
  published_date: string;
  summary: string;
  content: Content[];
  tag: string;
}

const ITEMS_PER_PAGE = 4;

const ArticleDetail = ({ article }: { article: ArticlesData | null }) => {
  const router = useRouter();
  const articleData = data.articles;

  const displayedArticles = articleData.slice(0, ITEMS_PER_PAGE);

  const handleCardClick = (articleId: number) => {
    router.push(`/Articles/${articleId}`);
  };

  const handleBackClick = () => {
    router.push(`/Articles`);
  };

  if (!article) {
    return <p>Artikel tidak ditemukan.</p>;
  }

  return (
    <>
      <Navigation/>
      <div className="px-8 md:px-32">
        <BackButton onBackButton={handleBackClick}/>
        <div className="flex flex-col justify-center items-center py-2">
          <HeaderDetailTitle article={article} />
        </div>
      </div>
      <div className="md:px-32">
        <HeaderDetailImage />
      </div>
      <div className="grid grid-cols-1 py-2 px-8 md:grid-cols-5">
        <aside className="hidden lg:flex flex-col justify-center items-center col-span-1">
          <SelectionSection article={article}/>
          <ShareArticle />
        </aside>
        <div className="md:col-span-4 md:pr-32">
          <ArticleDescription article={article} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-end py-8 md:px-32 lg:hidden">
        <ShareArticle />
      </div>
      <div className="hidden lg:block px-32">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Recommend articles post</h3>
          <a className="text-blue-600">See More</a>
        </div>
        <div className="w-full py-5 flex justify-evenly flex-wrap gap-2">
          {displayedArticles.map((article, index) => (
            <ArticlesCard
              key={index}
              article={article}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const article =
    articlesData.articles.find((article) => article.id === Number(id)) || null;

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = articlesData.articles.map((article) => ({
    params: { id: article.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default ArticleDetail;
