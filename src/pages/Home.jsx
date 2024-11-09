import React, { useContext } from "react";
import Hero from "../components/Hero";
import Title from "../components/Title";
import Books from "../components/Books";

const Home = () => {
   return (
      <div>
         <Hero />
         <div className="text-3xl text-clip text-center mt-5 ">
            <Title text1={"Latest"} text2={"Books"} />
         </div>
         <Books />
      </div>
   );
};

export default Home;
