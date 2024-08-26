import { GetStaticProps, GetStaticPaths } from "next";
import BackButton from "@/components/Articles/BackButton";
import HeaderDetailTitle from "@/components/Articles/HeaderDetailTitle";
import HeaderDetailImage from "@/components/Articles/HeaderDetailImage";
import SelectionSection from "@/components/Articles/SelectionSection";
import ShareArticle from "@/components/Articles/ShareArticle";
import ArticleDescription from "@/components/Articles/ArticleDescription";
import ArticlesCard from "@/components/Articles/ArticlesCard";
import { useRouter } from "next/router";
import { Navigation } from "@/components/common";
import axios from "axios";
import { API_BASE } from "@/lib/projectApi";
import { ArticleProps } from ".";
import { useEffect, useState } from "react";


const ITEMS_PER_PAGE = 4;

const ArticleDetail = ({ article }: { article: ArticleProps | null }) => {
  const router = useRouter();
  const [recommendArticles, setRecommendArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    if (article) {
      const fetchRecommendArticles = async () => {
        try {
          const response = await axios.get(`${API_BASE}/articles`);
          const allArticles = response.data.data;

          const relatedArticles = allArticles.filter(
            (item: ArticleProps) => item.tag === article.tag && item.article_id !== article.article_id
          ).slice(0, ITEMS_PER_PAGE);

          setRecommendArticles(relatedArticles);
        } catch (error) {
          console.error("Failed to fetch recommend articles:", error);
        }
      };

      fetchRecommendArticles();
    }
  }, [article])

  const handleCardClick = (article_id: number) => {
    router.push(`/Articles/${article_id}`);
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
        <aside className="hidden lg:flex flex-col items-center col-span-1">
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
          <p className="text-blue-600">See More</p>
        </div>
        <div className="w-full py-5 flex justify-evenly flex-wrap gap-2">
          {recommendArticles.map((recommendArticle) => (
            <ArticlesCard
              key={recommendArticle.article_id}
              article={recommendArticle}
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

  try {
    const [articleResponse, contentResponse] = await Promise.all([
      axios.get(`${API_BASE}/articles/${id}`),
      axios.get(`${API_BASE}/articles/content/${id}`)
    ])
    const articles = articleResponse.data.data || null;
    const contents = contentResponse.data.data || [];

    const article = articles.find((item: ArticleProps) => item.article_id === parseInt(id)) || null;

    const articleWithContent = {
      ...article,
      content: contents,
    };
    
    return {
      props: {
        article: articleWithContent,
      },
    };
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return {
      props: {
        article: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await axios.get(`${API_BASE}/articles`);
    const articles = response.data.data || null;

    const paths = articles.map((article: ArticleProps) => ({
      params: { id: article.article_id.toString() },
    }));
    
    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Failed to fetch article:", error);

    return {
      paths: [],
      fallback: "blocking",
    };
  }

};

export default ArticleDetail;
