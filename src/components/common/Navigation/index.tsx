import React, { useContext, useState } from "react";
import Link from "next/link";
import routes from "@/data/navigationRoute.json";
import { AppContext } from "@/providers/AppContext";

interface Route {
  href: string;
  title: string;
}

const Navigation: React.FC = () => {
  const { currentUser } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <nav className="py-5 px-8 lg:mx-12 flex items-center justify-between relative">

      <Link href="/">
        <div className="text-leaf text-3xl font-bold">ZenZone</div>
      </Link>


      <div className="block md:hidden z-30">
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


      <div className="hidden md:flex md:justify-center md:items-center flex-grow">
        {currentUser && (
          <div className="flex gap-5">
            {routes.map((route: Route, index: number) => (
              <Link key={index} href={route.href}>
                <p className="lg:text-2xl md:text-xl text-leaf  md:bg-mocca md:text-leaf  hover:text-lightGreen px-4 py-2 rounded-lg">
                  {route.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>


      <div
        className={`fixed top-0 right-0 bg-leaf  z-20 w-48 h-3/2 md:hidden transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute mb-10 top-4 right-4">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Close menu"
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
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center mt-16 w-full">
          {currentUser && (
            <>
              {routes.map((route: Route, index: number) => (
                <Link key={index} href={route.href}>
                  <p className="text-2xl  bg-leaf  w-full text-white hover:text-lightGreen px-4 py-2 rounded my-2">
                    {route.title}
                  </p>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>


      {!currentUser && (
        <div className="flex gap-5 z-10">
          <Link href="/Auth/SignIn">
            <button className="w-24 h-11 text-sm px-4 py-2 leading-none border rounded-lg bg-leaf font-bold text-mocca hover:bg-cream hover:border-leaf hover:text-leaf mt-4 lg:mt-0">
              Login
            </button>
          </Link>
          <Link href="/Auth/SignUp">
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
