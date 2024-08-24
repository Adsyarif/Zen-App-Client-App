import ArticlesCard from "@/components/Articles/ArticlesCard";
import HeaderArticles from "@/components/Articles/HeaderArticles";
import HeaderImageArticles from "@/components/Articles/HeaderImageArticles";
import { Navigation } from "@/components/common";
import { API_BASE } from "@/lib/projectApi";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";


export interface ArticleProps {
  article_id: number;
  title: string;
  author: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  summary: string;
  content: {
    article_content_id: number;
    article_id: number;
    sub_title: string;
    paragraph: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }[];
  tag: string;
}

const ITEMS_PER_PAGE = 12;

export default function Articles() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter,setFilter] = useState("");
  const [articles, setArticles] = useState<ArticleProps[]>([])
  const [articleContent, setArticleContent] = useState<ArticleProps[]>([])
  const [filteredArticles, setFilteredArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_BASE}/articles`);
        const data = response.data.data;
        console.log(data)
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error)
      }
    };
    
    fetchArticles();
  }, []);

  const applyFilter = useCallback((filter: string) => {
    setFilter(filter);
    if (filter === "") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(article => article.tag === filter));
    }
    setCurrentPage(1);
  }, [articles]);

  const handleCardClick = (article_id: number) => {
    router.push(`/Articles/${article_id}`);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const displayedArticles = filteredArticles.slice(
    0,
    currentPage * ITEMS_PER_PAGE
  ) || [];

  return (
    <>
    <Navigation/>
    <div className="md:px-32">
      <HeaderImageArticles />
      <div className="p-4">
        <HeaderArticles onFilterChange={applyFilter}/>
        <div className="w-full py-5 flex justify-evenly flex-wrap gap-2">
          {displayedArticles.map((article, index) => (
            <ArticlesCard
              key={index}
              article={article}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
        {displayedArticles.length < filteredArticles.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="hover:bg-green-500 text-[#22543D] border border-[#22543D] font-bold py-2 px-4 rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
    </>
    
  );
}
