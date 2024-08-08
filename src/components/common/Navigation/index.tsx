import React, { useState } from "react";
import Link from "next/link";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div className="text-white text-2xl font-bold">ZenZone</div>
      <div className="block lg:hidden">
        <button
          onClick={(): void => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>
      <div
        className={`w-full lg:flex lg:gap-5 lg:items-center lg:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow">
          <Link href="/consultant">
            <p className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
              Consultant
            </p>
          </Link>
          <Link href="/diary">
            <p className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
              Diary
            </p>
          </Link>
          <Link href="/forum">
            <p className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400">
              Forum
            </p>
          </Link>
        </div>
        <div>
          <Link href="/login">
            <p className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0">
              Login
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
