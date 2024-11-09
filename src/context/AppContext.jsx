import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const BookContext = createContext();

const BookContextProvider = (props) => {
   const [search, setSearch] = useState("the lost world");
   const [books, setBooks] = useState([]);
   const [count, setCount] = useState(0);
   const [loading, setLoading] = useState("false");

   const fetchData = async () => {
      setLoading(true);
      try {
         const response = await axios.get(
            `https://openlibrary.org/search.json?title=${search}`
         );

         const allBooks = response.data.docs.slice(0, 20).map((book) => {
            return {
               id: book.key,
               author_name: book.author_name
                  ? book.author_name[0]
                  : "Unknown Author",
               cover_i: book.cover_i,
               edition_count: book.edition_count,
               first_publish_year: book.first_publish_year,
               title: book.title,
               rating: book.ratings_average,
               language: book.language,
               want_to_read: book.want_to_read_count,
               currently_reading_count: book.currently_reading_count,
               format: book.format,
               publisher: book.publisher,
               cover_url: book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : null,
            };
         });

         setBooks(allBooks);
         setLoading(false);
      } catch (error) {
         console.log(error.message);
      }
   };

   useEffect(() => {
      fetchData();
   }, [search]);

   const value = {
      search,
      setSearch,
      books,
      count,
      setCount,
      loading,
      setLoading,
   };

   return (
      <BookContext.Provider value={value}>
         {props.children}
      </BookContext.Provider>
   );
};

export default BookContextProvider;
