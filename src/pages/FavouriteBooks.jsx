import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

const FavouriteBooks = () => {
   const [favorites, setFavorites] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      // Fetching the favorite books from local storage when the component mounts
      const savedFavorites =
         JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(savedFavorites); // Update the state with the saved favorites
   }, []);

   const handleFavoriteToggle = (book, event) => {
      // Prevent the event from bubbling up when the remove button is clicked
      event.stopPropagation();

      let updatedFavorites;
      // Check if the book is already in the favorites list
      const isFavorite = favorites.some((fav) => fav.id === book.id);

      if (isFavorite) {
         // If it's already in favorites, remove it
         updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
      } else {
         // Otherwise, add it to the favorites
         updatedFavorites = [...favorites, book];
      }

      // Update the favorites in state and localStorage
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      // Dispatch an event to notify other components (like Navbar) of the update
      window.dispatchEvent(new Event("storage"));
   };

   return (
      <div className="min-h-[80vh]">
         <div className="text-3xl text-center mt-5">
            <Title text1={"Favorites"} text2={"Books"} />
         </div>

         <div className="w-full flex flex-col">
            <div className="w-[85%] m-auto overflow-x-auto">
               <div className="p-2 min-w-full">
                  <div className="border rounded-lg overflow-hidden">
                     {favorites.length === 0 ? (
                        <p className="text-center text-xl py-8">
                           No favorite books
                        </p>
                     ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead>
                              <tr className="bg-blue-500">
                                 <th className="px-4 py-2 text-start text-sm font-semibold text-white uppercase">
                                    Image
                                 </th>
                                 <th className="px-4 py-2 text-start text-sm font-semibold text-white uppercase">
                                    Name
                                 </th>
                                 <th className="px-4 py-2 text-start text-sm font-semibold text-white uppercase hidden md:table-cell">
                                    Author
                                 </th>
                                 <th className="px-4 py-2 text-start text-sm font-semibold text-white uppercase hidden md:table-cell">
                                    Rating
                                 </th>
                                 <th className="px-4 py-2 text-end text-sm font-semibold text-white uppercase">
                                    Action
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200">
                              {/* Loop through the favorite books and display them */}
                              {favorites.map((book, index) => (
                                 <tr
                                    // On clicking a book, navigate to the book details page
                                    onClick={() => {
                                       window.scrollTo(0, 0); // Scroll to the top
                                       navigate(
                                          `/details/${encodeURIComponent(
                                             book.id
                                          )}`,
                                          {
                                             state: { book }, // Pass book details in the state
                                          }
                                       );
                                    }}
                                    className="cursor-pointer hover:bg-yellow-100"
                                    key={index}
                                 >
                                    <td className="px-4 py-2">
                                       <img
                                          // Show the book cover image, fallback to a default image if none
                                          src={
                                             book.cover_url ||
                                             "https://bookcart.azurewebsites.net/Upload/Default_image.jpg"
                                          }
                                          alt={book.title}
                                          className="w-[50px] h-[80px] object-cover rounded-md shadow-md"
                                       />
                                    </td>
                                    <td className="px-4 py-2 text-sm font-medium">
                                       {book.title}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800 hidden md:table-cell">
                                       {book.author_name}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800 hidden md:table-cell">
                                       {/* Rating display: Render stars based on the book rating */}
                                       <p className="text-sm mb-2">
                                          <span className="font-medium text-gray-700">
                                             Rating:&nbsp;
                                          </span>
                                          {Array.from(
                                             { length: 5 },
                                             (_, index) => (
                                                <i
                                                   key={index}
                                                   className={`fa-solid fa-star ${
                                                      index <
                                                      Math.round(book.rating)
                                                         ? "text-yellow-500"
                                                         : "text-gray-300"
                                                   }`}
                                                ></i>
                                             )
                                          )}
                                       </p>
                                    </td>
                                    <td className="px-4 py-2 text-end text-sm font-medium">
                                       {/* Button to remove the book from favorites */}
                                       <button
                                          onClick={(event) =>
                                             handleFavoriteToggle(book, event)
                                          }
                                          className="text-red-500 hover:text-red-600"
                                       >
                                          <i className="fa-solid fa-trash" />
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FavouriteBooks;
