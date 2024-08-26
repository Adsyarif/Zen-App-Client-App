import { HTMLAttributes } from "react";

interface DiaryMoodProps extends HTMLAttributes<HTMLSpanElement> {
  mood: string;
}

// const mood = [
//   "excited",
//   "happy",
//   "sad",
//   "angry",
//   "stress",
//   "hungry",
//   "fun",
//   "grateful",
//   "anxious",
//   "hopefull",
// ];

export function DiaryMoodColor(prop: DiaryMoodProps) {
  const { mood, ...rest } = prop;
  const getMoodStyle = (mood: string) => {
    switch (mood) {
      case "excited":
        return {
          emoji: "🤩",
          styles:
            "bg-gradient-radial from-zinc-100 via-orange-200 to-orange-500/70 text-orange-800",
        };
      case "happy":
        return {
          emoji: "😊",
          styles:
            "bg-gradient-radial from-zinc-100 via-yellow-200 to-yellow-500/70 text-yellow-800",
        };
      case "sad":
        return {
          emoji: "😢",
          styles:
            "bg-gradient-radial from-zinc-100 via-blue-200 to-blue-500/70 text-blue-800",
        };
      case "fun":
        return {
          emoji: "😎",
          styles:
            "bg-gradient-radial from-zinc-100 via-pink-200 to-pink-500/70 text-pink-800",
        };

      case "angry":
        return {
          emoji: "😡",
          styles:
            "bg-gradient-radial from-zinc-100 via-red-200 to-red-500/70 text-red-800",
        };
      case "stress":
        return {
          emoji: "😰",
          styles:
            "bg-gradient-radial from-zinc-100 via-gray-200 to-gray-500/70 text-gray-800",
        };
      case "hungry":
        return {
          emoji: "🍔",
          styles:
            "bg-gradient-radial from-zinc-100 via-amber-200 to-amber-500/70 text-amber-800",
        };

      case "grateful":
        return {
          emoji: "🙏",
          styles:
            "bg-gradient-radial from-zinc-100 via-green-200 to-green-500/70 text-green-800",
        };
      case "anxious":
        return {
          emoji: "😟",
          styles:
            "bg-gradient-radial from-zinc-100 via-purple-200 to-purple-500/70 text-purple-800",
        };
      case "hopefull":
        return {
          emoji: "😇",
          styles:
            "bg-gradient-radial from-zinc-100 via-teal-200 to-teal-500/70 text-teal-800",
        };
      default:
        return {
          emoji: "🤔",
          styles: "bg-gray-300 text-gray-800",
        };
    }
  };

  const { emoji, styles } = getMoodStyle(mood);

  return (
    <>
      <span {...rest} className={`px-3 py-1 rounded-xl shadow-lg ${styles}`}>
        {emoji} {mood}
      </span>
    </>
  );
}
