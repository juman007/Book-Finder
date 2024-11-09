import React from "react";
import Title from "../components/Title";

const AboutUs = () => {
   return (
      <div className="w-[85%] m-auto about-responsive min-h-[80vh]">
         <div className="text-3xl text-center pt-8 border-t">
            <Title text1={"ABOUT"} text2={"US"} />
         </div>

         <div className="my-10 flex flex-col md:flex-row gap-16">
            <img
               className="w-full md:max-w-[450px]"
               src="https://media.gettyimages.com/id/1425221653/photo/vision-proud-and-success-business-people-portrait-in-workplace-or-office-building-with-smile.jpg?s=2048x2048&w=gi&k=20&c=hvCdb-9fmKxS8fsqqFjxlucNeTVqIi-DZlqcL5AFFsQ="
               alt=""
            />
            <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Optio itaque, maxime culpa, vitae laborum laudantium voluptas
                  velit vero perspiciatis temporibus provident. Corrupti nihil
                  sint autem ab error voluptate accusamus molestias quas. Odio
                  obcaecati quasi quis ex nisi at nobis minus sapiente deleniti
                  minima quos, saepe totam facere ullam distinctio!{" "}
               </p>
               <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Excepturi, eius! Aperiam amet earum accusamus, incidunt ipsa
                  animi nesciunt sequi omnis possimus delectus beatae eaque
                  molestias recusandae eos similique non et magnam repudiandae
                  corrupti reiciendis vitae temporibus cum ab. Excepturi, sint
                  possimus.
               </p>
               <b className="text-gray-800 text-center md:text-start">
                  Our Mission
               </b>
               <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Autem, eveniet neque! Voluptas repellat quos architecto
                  cumque! Eos odit perferendis velit ut temporibus vel, aliquid
                  vero excepturi molestias unde modi blanditiis itaque adipisci.
               </p>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
