import React, { useState, useEffect } from "react";
import { ShoppingBasket } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsSun, BsMoon } from "react-icons/bs";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <nav className="flex items-center justify-between h-20 max-w-6xl mx-auto">
        <Link to={"/"}>
          <div className="ml-5">
            <h1 className="bg-gradient-to-br from-violet-900 to-purple-300 bg-clip-text text-transparent text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer tracking-wider">
              BEST PRODUCTS
            </h1>
          </div>
        </Link>

        <div className="flex list-none items-center space-x-6 mr-5 text-gray-700 font-semibold dark:text-white">
          <Link to={"/"}>
            <li className="cursor-pointer hover:text-purple-500 transition duration-300 ease-in">
              Home
            </li>
          </Link>
          <Link to={"/cart"}>
            <div className="relative">
              <ShoppingBasket className="text-2xl cursor-pointer hover:text-purple-600 transition transform duration-200" />
              {cart.length > 0 && (
                <div className="absolute bg-purple-600 text-xs w-5 h-5 flex justify-center items-center animate-bounce -top-1 -right-2 rounded-full text-white">
                  {cart.length}
                </div>
              )}
            </div>
          </Link>

          <button
            onClick={toggleDarkMode}
            className="p-2 border rounded-md transition duration-300 hover:scale-110"
          >
            {darkMode ? (
              <BsSun className="text-yellow-400 text-xl" />
            ) : (
              <BsMoon className="text-gray-800 dark:text-white text-xl" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
