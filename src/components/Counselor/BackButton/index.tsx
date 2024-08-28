import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className="my-3 mx-7 text-black flex gap-5 aligh-center hover:cursor-pointer"
      onClick={() => router.push("/Counselor")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 h-8 hover:pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      <p className="text-xl align-middle p-0">Back</p>
    </div>
  );
};

export default BackButton;
