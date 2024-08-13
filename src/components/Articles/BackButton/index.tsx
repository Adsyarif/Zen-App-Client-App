import { FaArrowLeftLong } from "react-icons/fa6";

interface BackButtonProps {
  onBackButton: any;
}

export default function BackButton({ onBackButton }: BackButtonProps) {
  return (
    <button onClick={onBackButton} className="flex justify-start items-center">
      <FaArrowLeftLong />
      <h2 className="text-black font-semibold pl-2">Back</h2>
    </button>
  );
}
