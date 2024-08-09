export interface TopTopicProps {
  topicName: string;
  totalPost: number;
  trendingNumber: number;
}
export function TopTopics(props: TopTopicProps) {
  const { topicName, totalPost, trendingNumber } = props;
  return (
    <>
      <div className="ml-3">
        <h3 className="font-semibold my-3">{topicName}</h3>
        <p className="text-slate-400 my-1">{totalPost} Posts</p>
        <p className="text-slate-400 my-1">Trending No.{trendingNumber}</p>
      </div>
    </>
  );
}
