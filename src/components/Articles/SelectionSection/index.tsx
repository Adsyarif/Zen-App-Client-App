export default function SelectionSection({ article }: { article: any }) {
  return (
    <div className="flex flex-col items-start pb-8">
      <ul className="space-y-4">
        {article.content &&
          article.content.map((section: any, index: number) => (
            <li key={index} className="flex items-center group cursor-pointer">
              <div className="h-8 w-1 bg-gray-300 group-hover:bg-teal-600 mr-2"></div>
              <h3 className="text-lg font-semibold group-hover:text-teal-600">
                {section.sub_title}
              </h3>
            </li>
          ))}
      </ul>
    </div>
  );
}
