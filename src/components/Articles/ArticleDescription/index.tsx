export default function ArticleDescription({ article }: {article:any}) {
  
  return (
    <>
      {article.content && article.content.map((section:any, index:number) => (
        <div key={index} className="mb-2">
          <h2 className="text-xl font-bold">{section.sub_title}</h2>
          <p>{section.paragraph}</p>
        </div>
      ))}
    </>
  );
}
