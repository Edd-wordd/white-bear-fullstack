import React from "react";
import landingBear from "../../img/logo-landing.png";
import SignUp from "../UI/SignUp";
import Login from "../UI/Login";

export default function Landing() {
   return (
      <div className="background-image">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="row">
                     <img
                        className="ml-3 mt-5 bearStar"
                        src={landingBear}
                        alt="white bear logo"
                     />

                     <h1 className="ml-3 mt-5" id="brandHeader">
                        White Bear
                     </h1>
                  </div>
                  <div className="row landCards">
                     <SignUp />
                     <Login />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
