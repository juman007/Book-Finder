import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import FavouriteBooks from "./pages/FavouriteBooks";
import BookDetails from "./pages/BookDetails";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchPage from "./pages/SearchPage";
const App = () => {
   return (
      <>
         <ToastContainer />
         <Navbar />
         <div>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<AboutUs />} />
               <Route path="/favourite" element={<FavouriteBooks />} />
               <Route path="/details/:id" element={<BookDetails />} />
               <Route path="/search" element={<SearchPage />} />
            </Routes>
         </div>
         <Footer />
      </>
   );
};

export default App;
