import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import routes from "@/data/navigationRoute.json";
import { AppContext, UserContextType } from "@/providers/AppContext";

interface Route {
  href: string;
  title: string;
}

const Navigation: React.FC = () => {
  const { currentUser } = useContext<UserContextType>(AppContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const userLogin = (userInfo: typeof currentUser): void => {
    if (userInfo) {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    userLogin(currentUser);
  }, [currentUser]);

  const toggleMenu = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <nav className="py-5 px-8 md:px-32 flex items-center justify-between md:h-40">
      <Link href="/"><div className="text-leaf text-3xl font-bold">ZenZone</div></Link>
    
      <div className="block md:hidden">
        <button
          onClick={toggleMenu}
          className="text-leaf focus:outline-none"
          aria-label="Toggle menu"
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
        className={`w-full md:flex md:gap-5 md:items-center md:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {isLogin && (
          <div className="text-sm md:justify-between gap-32 md:flex md:flex-grow md:flex-row">
            {routes.map((route: Route, index: number) => (
              <Link key={index} href={route.href}>
                <p className="block mt-4 text-2xl md:inline-block md:mt-0 text-leaf hover:text-lightGreen">
                  {route.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      {isLogin ? (
        <Link href="/profile">
          <div>
            <Image
              src="/counselorImg.png"
              width={36}
              height={36}
              alt="Profile picture"
              className="w-14 h-14 border rounded-full border-leaf object-cover"
            />
          </div>
        </Link>
      ) : (
        <div className="flex gap-5">
          <Link href="/login">
            <button className="w-24 h-11 text-sm px-4 py-2 leading-none border rounded-lg bg-leaf font-bold text-mocca hover:bg-cream hover:border-leaf hover:text-leaf mt-4 lg:mt-0">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="w-24 h-11 text-sm px-4 py-2 leading-none border rounded-lg text-leaf font-bold border-leaf hover:border-transparent hover:text-cream hover:bg-leaf mt-4 lg:mt-0">
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
