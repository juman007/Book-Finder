import React, { useState, useEffect } from "react";
import logo from "../assets/book logo.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
   const [favoriteCount, setFavoriteCount] = useState(0);

   // Fetch the favorite books count from localStorage on component mount
   useEffect(() => {
      const savedBooks = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoriteCount(savedBooks.length);

      // Listen for changes to localStorage (when favorites are updated)
      const handleStorageChange = () => {
         const updatedBooks =
            JSON.parse(localStorage.getItem("favorites")) || [];
         setFavoriteCount(updatedBooks.length);
      };

      window.addEventListener("storage", handleStorageChange);

      // Cleanup the event listener when component unmounts
      return () => {
         window.removeEventListener("storage", handleStorageChange);
      };
   }, []);

   return (
      <div className="bg-yellow-200">
         <div className="px-5 w-full md:w-[85%] flex justify-between items-center m-auto nav">
            <div>
               <Link to={"/"}>
                  <img className="w-36 nav-logo" src={logo} alt="logo" />
               </Link>
            </div>

            <ul className="flex items-center gap-8">
               <NavLink
                  to={"/"}
                  className="hover:text-red-500 text-lg cursor-pointer nav-responsive"
               >
                  Home
               </NavLink>
               <NavLink
                  to={"/about"}
                  className="hover:text-red-500 text-lg cursor-pointer nav-responsive"
               >
                  About Us
               </NavLink>
               <NavLink to={"/favourite"} className="relative cursor-pointer">
                  <i className="fa-solid fa-heart text-red-500 text-2xl"></i>
                  <span className="w-5 h-5 bg-green-500 text-center rounded-full text-white font-semibold absolute -top-1 -right-3 text-xs shadow-md flex items-center justify-center">
                     {favoriteCount}
                  </span>
               </NavLink>
            </ul>
         </div>
      </div>
   );
};

export default Navbar;
