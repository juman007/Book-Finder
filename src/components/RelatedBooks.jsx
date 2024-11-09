import { useContext, useState } from "react";
import { BookContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";

const RelatedBooks = () => {
   const { books, loading } = useContext(BookContext);
   const [favorites, setFavorites] = useState(
      JSON.parse(localStorage.getItem("favorites")) || []
   );
   const navigate = useNavigate();

   const handleFavoriteToggle = (book) => {
      let updatedFavorites;
      // Check if the book is already in the favorites list
      const isFavorite = favorites.some((fav) => fav.id === book.id);

      if (isFavorite) {
         // If it's already a favorite, remove it
         updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
      } else {
         // Otherwise, add it
         updatedFavorites = [...favorites, book];
      }

      // Update the state and localStorage
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      // Dispatch an event to notify other components (like Navbar) of the update
      window.dispatchEvent(new Event("storage"));
   };

   return loading ? (
      <div className="flex justify-center items-center  h-[80vh]">
         <Loader />
      </div>
   ) : (
      <div className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
         {books.slice(0, 4).map((book) => (
            <div
               key={book.id}
               className="border border-gray-300 bg-white shadow-lg py-6 px-4 rounded-lg transition-all duration-500 hover:scale-105 ease-in-out relative"
            >
               {/* favorite icon */}
               <i
                  onClick={() => handleFavoriteToggle(book)}
                  className={`fa-regular fa-heart cursor-pointer absolute right-5 top-5 ${
                     favorites.some((fav) => fav.id === book.id)
                        ? "fa-solid text-red-500"
                        : "fa-regular hover:text-red-500"
                  }`}
               ></i>

               <div className="flex flex-col items-center">
                  <img
                     src={
                        book.cover_url ||
                        "https://bookcart.azurewebsites.net/Upload/Default_image.jpg"
                     }
                     alt={book.title}
                     className="w-[180px] h-[240px] object-cover rounded-md shadow-md"
                  />
                  <div className="mt-4 text-center w-full">
                     <h1 className="font-bold text-xl text-gray-800 mb-1">
                        {book.title}
                     </h1>
                     <p className="text-sm text-gray-500 mb-1">
                        <span className="font-medium">Author:</span>{" "}
                        {book.author_name}
                     </p>
                     <button
                        onClick={() => {
                           window.scrollTo(0, 0);
                           navigate(`/details/${encodeURIComponent(book.id)}`, {
                              state: { book },
                           });
                        }}
                        className="bg-black text-white mt-3 px-4 py-1 text-sm cursor-pointer hover:bg-gray-800"
                     >
                        See more
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default RelatedBooks;
