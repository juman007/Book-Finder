import { useContext, useState } from "react";
import { BookContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import Title from "../components/Title";

const SearchPage = () => {
   // Accessing the books and loading state from the context
   const { books, loading } = useContext(BookContext);

   // Setting up the state to store favorite books and initializing it from localStorage if available
   const [favorites, setFavorites] = useState(
      JSON.parse(localStorage.getItem("favorites")) || []
   );

   const navigate = useNavigate(); // Initializing the navigate function to allow navigation between routes

   // Function to handle toggling a book as a favorite
   const handleFavoriteToggle = (book) => {
      let updatedFavorites;
      const isFavorite = favorites.some((fav) => fav.id === book.id); // Check if the book is already in favorites

      // If the book is already a favorite, remove it, otherwise add it
      if (isFavorite) {
         updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
      } else {
         updatedFavorites = [...favorites, book];
      }

      setFavorites(updatedFavorites); // Update the favorites state
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save the updated favorites to localStorage
      window.dispatchEvent(new Event("storage")); // Trigger a storage event for synchronization across tabs
   };

   return loading ? (
      // Show loader while data is loading
      <div className="flex justify-center items-center h-[80vh]">
         <Loader />
      </div>
   ) : (
      // Main content when loading is complete
      <div>
         <div className="text-3xl text-center mt-5">
            {/* Title component displaying "Search Results" */}
            <Title text1={"Search"} text2={"Results"} />
         </div>
         {books.length > 0 ? (
            // If there are books to display, show them in a grid
            <div className="w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
               {books.map((book) => (
                  // Rendering each book in a card format
                  <div
                     key={book.id}
                     className="border border-gray-300 bg-white shadow-lg py-6 px-4 rounded-lg transition-all duration-500 hover:scale-105 ease-in-out relative"
                  >
                     {/* Favorite button for each book */}
                     <i
                        onClick={() => handleFavoriteToggle(book)} // Toggle favorite on click
                        className={`fa-regular fa-heart cursor-pointer absolute right-5 top-5 ${
                           favorites.some((fav) => fav.id === book.id)
                              ? "fa-solid text-red-500" // If it's a favorite, show solid red heart
                              : "fa-regular hover:text-red-500" // If not a favorite, show outline heart with hover effect
                        }`}
                     ></i>

                     <div className="flex flex-col items-center">
                        {/* Book cover image */}
                        <img
                           src={
                              book.cover_url ||
                              "https://bookcart.azurewebsites.net/Upload/Default_image.jpg" // Fallback image if no cover URL
                           }
                           alt={book.title}
                           className="w-[180px] h-[240px] object-cover rounded-md shadow-md"
                        />
                        <div className="mt-4 text-center w-full">
                           {/* Book title */}
                           <h1 className="font-bold text-xl text-gray-800 mb-1">
                              {book.title}
                           </h1>

                           {/* Rating display */}
                           <p className="text-sm mb-2">
                              <span className="font-medium text-gray-700">
                                 Rating:&nbsp;
                              </span>
                              {Array.from({ length: 5 }, (_, index) => (
                                 // Generating stars based on rating value
                                 <i
                                    key={index}
                                    className={`fa-solid fa-star ${
                                       index < Math.round(book.rating)
                                          ? "text-yellow-500" // Filled star for rating
                                          : "text-gray-300" // Empty star
                                    }`}
                                 ></i>
                              ))}
                              <span className="ml-2 bg-green-600 text-white px-2 text-xs rounded-full py-[1px]">
                                 {book.rating
                                    ? Math.round(book.rating) + ".0"
                                    : "No rating"}{" "}
                              </span>
                           </p>

                           {/* Author name */}
                           <p className="text-sm text-gray-700 mb-1">
                              <span className="font-medium">Author:</span>{" "}
                              {book.author_name}
                           </p>
                           {/* Button to navigate to book details page */}
                           <button
                              onClick={() => {
                                 window.scrollTo(0, 0); // Scroll to top when navigating
                                 navigate(
                                    `/details/${encodeURIComponent(book.id)}`, // Navigate to the details page
                                    {
                                       state: { book }, // Pass book details to the next page
                                    }
                                 );
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
         ) : (
            // Show this message if no books are found
            <div className="text-center mt-10 text-gray-600 text-xl">
               <h1 className="text-red-500 text-center text-2xl animate-pulse">
                  No book found
               </h1>
            </div>
         )}
      </div>
   );
};

export default SearchPage;
