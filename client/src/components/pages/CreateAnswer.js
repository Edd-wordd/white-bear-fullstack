import React from "react";
import AppTemplate from "../UI/appTemplate";
import { Link } from "react-router-dom";
import { MAX_CARD_CHARS } from "../../utils/helpers";
import classnames from "classnames";
import { checkIsOver } from "../../utils/helpers";

export default class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      console.timeLog("edwrd is here");
      this.state = {
         answerText: "",
      };
   }
   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length <= 0 ||
         this.state.answerText.length > MAX_CARD_CHARS
      ) {
         return true;
      } else {
         return false;
      }
   }

   setAnswerText(e) {
      console.log(e.target, e.target.value);
      this.setState({ answerText: e.target.value });
   }
   render() {
      return (
         <AppTemplate>
            <div className="my-2 text-center text-muted">
               <h4>Add an answer</h4>
            </div>
            <div className="mb-2">
               <div className="card bg-primary">
                  <div className="card-body secondCard">
                     <textarea
                        id="text1"
                        className="w-100"
                        rows="6"
                        autoFocus={true}
                        onChange={(e) => this.setAnswerText(e)}
                     ></textarea>
                  </div>
               </div>
            </div>
            <p className="float-right mb-5" id="countMe">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.answerText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.state.answerText.length}/{MAX_CARD_CHARS}
               </span>
            </p>
            <div className="clearfix"></div>

            <Link
               to="/create-imagery"
               className={classnames(
                  "btn btn-outline-primary btn-lg float-right",
                  { disabled: this.checkHasInvalidCharCount() }
               )}
               id="nextAnswer"
            >
               Next
            </Link>
         </AppTemplate>
      );
   }
}
