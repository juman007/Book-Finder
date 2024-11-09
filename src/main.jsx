import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import BookContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
   <BrowserRouter
      future={{
         v7_startTransition: true,
         v7_relativeSplatPath: true,
      }}
   >
      <BookContextProvider>
         <App />
      </BookContextProvider>
   </BrowserRouter>
);
