import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Title from "../components/Title";
import RelatedBooks from "../components/RelatedBooks";
import Loader from "../components/Loader/Loader";

const BookDetails = () => {
   const [details, setDetails] = useState({});
   const [authorName, setAuthorName] = useState("Unknown Author");
   const { id } = useParams();
   const location = useLocation();
   const { book, loading } = location.state || {}; // Get the book state or an empty object if undefined

   // Function to fetch author details
   const authorFind = async (author) => {
      if (!author || author === "Author key not found") {
         setAuthorName("Author not available");
         return;
      }

      try {
         const res = await axios.get(`https://openlibrary.org${author}.json`);
         if (res.data && res.data.name) {
            setAuthorName(res.data.name);
         } else {
            setAuthorName("Author not available");
         }
      } catch (error) {
         console.log("Error fetching author details:", error);
         setAuthorName("Author not available");
      }
   };

   // Function to fetch book details
   const bookDetails = async () => {
      try {
         const res = await axios.get(`https://openlibrary.org${id}.json`);
         if (res.data) {
            setDetails(res.data);
         }
      } catch (error) {
         console.log("Error fetching book details:", error);
      }
   };

   useEffect(() => {
      bookDetails();
   }, [id]);

   useEffect(() => {
      if (
         details.authors &&
         details.authors[0] &&
         details.authors[0].author &&
         details.authors[0].author.key
      ) {
         authorFind(details.authors[0].author.key);
      } else {
         setAuthorName("Author not available");
      }
   }, [id, details]);

   return loading ? (
      <div className="flex justify-center items-center  h-[80vh]">
         <Loader />
      </div>
   ) : (
      <div className="w-full mt-10">
         <div className="w-full md:w-[85%] m-auto flex flex-col md:flex-row book-details">
            <div className="w-full  md:w-[40%] flex justify-center">
               {details.covers && details.covers.length > 0 ? (
                  <img
                     className="shadow-md border p-2 rounded h-[450px]"
                     src={`https://covers.openlibrary.org/b/id/${details.covers[0]}-L.jpg`}
                     alt={details.title || "Book cover"}
                  />
               ) : (
                  <img
                     className="shadow-md border p-2 rounded h-[450px]"
                     src="https://bookcart.azurewebsites.net/Upload/Default_image.jpg"
                     alt="Default book cover"
                  />
               )}
            </div>
            <div className="w-full px-10 m-auto md:w-[60%] mt-16 md:mt-0">
               <h1 className="text-5xl font-bold mb-2 text-center md:text-start -mt-10 md:mt-0">
                  {details.title}
               </h1>
               <p className="font-semibold text-gray-700 mb-2">
                  Author: {authorName}
               </p>

               {/* Rating */}
               <p className="text-sm mb-2">
                  <span className="font-medium text-gray-700">
                     Rating:&nbsp;
                  </span>
                  {Array.from({ length: 5 }, (_, index) => (
                     <i
                        key={index}
                        className={`fa-solid fa-star ${
                           index < Math.round(book?.rating || 0)
                              ? "text-yellow-500"
                              : "text-gray-300"
                        }`}
                     ></i>
                  ))}
                  <span className="ml-2 bg-green-600 text-white px-2 text-xs rounded-full py-[1px]">
                     {book?.rating
                        ? Math.round(book.rating) + ".0"
                        : "No rating"}
                  </span>
                  <span className="font-semibold ml-2 text-gray-700">
                     {book?.want_to_read || 0} Want to read |{" "}
                     {book?.currently_reading_count || 0} Currently reading
                  </span>
               </p>

               <p className="text-gray-700 mb-2 text-start">
                  <span className="font-semibold text-gray-700">
                     Description:
                  </span>{" "}
                  {details.description &&
                  typeof details.description === "object" &&
                  details.description.value
                     ? details.description.value
                     : details.description
                     ? details.description
                     : "No description available"}
               </p>

               <p className="text-gray-700 mb-2 text-start">
                  <span className="font-semibold text-gray-700">Format: </span>
                  <span>
                     {book?.format
                        ? book.format.slice(0, 5).join(", ")
                        : "No format available"}
                  </span>
               </p>
               <p className="text-gray-700 mb-2 text-start">
                  <span className="font-semibold text-gray-700">
                     Language:{" "}
                  </span>
                  <span>
                     {book?.language
                        ? book.language.join(", ")
                        : "No languages available"}
                  </span>
               </p>
               <p className="text-gray-700 mb-2 text-start">
                  <span className="font-semibold text-gray-700">
                     Subject Places:{" "}
                  </span>
                  <span>
                     {details.subject_places
                        ? details.subject_places.join(", ")
                        : "No subject places available"}
                  </span>
               </p>

               <p className="text-gray-700 mb-2 text-start">
                  <span className="font-semibold text-gray-700">
                     Subjects:{" "}
                  </span>
                  {details.subjects
                     ? details.subjects.slice(0, 5).join(", ")
                     : "No subjects available"}
               </p>

               <div className="w-full mt-8 mb-10 details-box-main grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="border border-gray-600 py-3 rounded-md details-box">
                     <p className="text-gray-700 font-semibold text-sm text-center mb-1">
                        First published
                     </p>
                     <p className="text-gray-700 text-sm text-center">
                        {details.first_publish_date || "NA"}
                     </p>
                  </div>
                  <div className="border border-gray-600 py-3 rounded-md details-box">
                     <p className="text-gray-700 font-semibold text-sm text-center mb-1">
                        Publisher
                     </p>
                     <p className="text-gray-700 text-center">
                        {book?.publisher ? book.publisher[0] : "NA"}
                     </p>
                  </div>
                  <div className="border border-gray-600 py-3 rounded-md details-box">
                     <p className="text-gray-700 font-semibold text-sm text-center mb-1">
                        Last Modified
                     </p>
                     <p className="text-gray-700 text-center">
                        {details.last_modified &&
                        typeof details.last_modified === "object" &&
                        details.last_modified.value
                           ? new Date(
                                details.last_modified.value
                             ).toLocaleDateString("en-GB")
                           : "No last modified date available"}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="text-3xl text-center mt-5">
            <Title text1={"Related"} text2={"Books"} />
         </div>
         {/*  Display related books component */}
         <RelatedBooks />
      </div>
   );
};

export default BookDetails;
