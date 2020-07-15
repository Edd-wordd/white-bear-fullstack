import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../UI/appTemplate";
import { Link } from "react-router-dom";
import { MAX_CARD_CHARS } from "../../utils/helpers";
import classnames from "classnames";
import { checkIsOver } from "../../utils/helpers";

export default class CreateImagery extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: "",
         imageryText: "",
      };
   }
   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length <= 0 ||
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length <= 0
      ) {
         return true;
      } else {
         return false;
      }
   }
   setImageryText(e) {
      console.log(e.target, e.target.value);
      this.setState({ imageryText: e.target.value });
   }
   setAnswerText(e) {
      console.log(e.target, e.target.value);
      this.setState({ answerText: e.target.value });
   }

   render() {
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">
               Add memorable imagery
            </h4>
            <div className="mb-2">
               <div className="card bg-primary">
                  <div className="card-body secondCard">
                     <textarea
                        id="imagery-create"
                        className="w-100 d-sm-nope"
                        rows="7"
                        autoFocus={true}
                        onChange={(e) => this.setImageryText(e)}
                     ></textarea>
                  </div>
               </div>
               <div className="card bg-secondary">
                  <textarea
                     className="card-body secondCard"
                     rows="7"
                     id="imagery-answer"
                     onChange={(e) => this.setAnswerText(e)}
                  ></textarea>
               </div>
            </div>
            <p className="float-right mb-5" id="countMe2">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.imageryText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  Top:&nbsp;{this.state.imageryText.length}/{MAX_CARD_CHARS}
                  &nbsp;&nbsp;&nbsp;
               </span>
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.answerText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  Bottom: {this.state.answerText.length}/{MAX_CARD_CHARS}
               </span>
            </p>
            <div className="clearfix"></div>
            <Link
               to="/create-answer"
               className="btn btn-link"
               id="backToAnswer"
            >
               Back to answer
            </Link>

            <Link
               to="/create-answer"
               id="save-imagery"
               className={classnames("btn btn-primary btn-lg float-right ", {
                  disabled: this.checkHasInvalidCharCount(),
               })}
            >
               <img
                  className="mb-2"
                  src={saveIcon}
                  width="20px;"
                  style={{ marginTop: "5px", marginRight: "8px" }}
                  alt=""
               />
               Save
            </Link>
         </AppTemplate>
      );
   }
}
