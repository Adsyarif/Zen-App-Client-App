export const renderStars = (score: number, maxStars = 5): string => {
  const starFull = "★";
  const starEmpty = "☆";
  return starFull.repeat(score) + starEmpty.repeat(maxStars - score);
};

export const avgRate = (reviews: any[] | undefined): number => {
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  const total = reviews.reduce((acc, review) => {
    const score = review?.rating || 0;
    return acc + score;
  }, 0);

  const average = total / reviews.length;
  return Math.floor(average);
};
