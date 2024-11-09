import React, { useContext, useState } from "react";
import hero from "../assets/hero image.png";
import { BookContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
   const { setSearch } = useContext(BookContext);
   const [searchInput, setSearchInput] = useState("");
   const navigate = useNavigate();

   // Handle input change in the search field
   const handleInputChange = (e) => {
      setSearchInput(e.target.value);
   };

   const handleSearch = () => {
      // Only proceed if searchInput is not empty
      if (searchInput.trim()) {
         setSearch(searchInput);
         navigate("/search");
      }
   };
   return (
      <div className="w-full h-auto bg-yellow-200">
         <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="w-[60%] hero-response">
               <div className="w-[80%] m-auto hero-response ">
                  <h1 className="text-5xl md:text-6xl font-bold mb-2">
                     Discover Your Next Favorite Book
                  </h1>
                  <p className="text-sm text-gray-700 mb-5">
                     Explore thousands of books across various genres, find what
                     excites you, and start your reading adventure today.
                  </p>

                  {/* Search bar */}

                  <div className="w-full flex items-center  mb-6">
                     <input
                        className="flex-grow px-4 py-3 rounded-l-md bg-white text-gray-800 placeholder-gray-500 shadow-lg focus:outline-none"
                        type="text"
                        placeholder="Search books..."
                        value={searchInput}
                        onChange={handleInputChange}
                     />
                     <button
                        onClick={handleSearch}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-r-md shadow-lg transition-colors duration-300"
                     >
                        <i className="fa-solid fa-magnifying-glass"></i>
                     </button>
                  </div>
               </div>
            </div>
            <div className="30%">
               <img
                  className="w-[400px] hero-img"
                  src={hero}
                  alt="Hero Image"
               />
            </div>
         </div>
      </div>
   );
};

export default Hero;
