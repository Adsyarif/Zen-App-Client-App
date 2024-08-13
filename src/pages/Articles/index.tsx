import ArticlesCard from "@/components/Articles/ArticlesCard";
import HeaderArticles from "@/components/Articles/HeaderArticles";
import HeaderImageArticles from "@/components/Articles/HeaderImageArticles";
import data from "@/data/articlesData.json";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const ITEMS_PER_PAGE = 12;

export default function Articles() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter,setFilter] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(data.articles);

  const applyFilter = useCallback((filter: string) => {
    setFilter(filter);
    if (filter === "") {
      setFilteredArticles(data.articles);
    } else {
      setFilteredArticles(data.articles.filter(Article => Article.tag === filter));
    }
    setCurrentPage(1);
  }, []);

  const handleCardClick = (articleId: number) => {
    router.push(`/Articles/${articleId}`);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const displayedArticles = filteredArticles.slice(
    0,
    currentPage * ITEMS_PER_PAGE
  );

  return (
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
  );
}
