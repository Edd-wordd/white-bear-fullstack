import React from "react";
import AppTemplate from "../UI/appTemplate";
import saveIcon from "../../icons/save.svg";
import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import memoryCards from "../../mock data/memory-cards";
import without from "lodash/without";
import actions from "../../store/actions";

const memoryCard = memoryCards[2];
class Edit extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         answerText: memoryCard.answer,
         imageryText: memoryCard.imagery,
         isChecked: false,
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
      this.setState({ answerText: e.target.value });
   }
   isDeleteButtonShown() {
      this.setState({ isChecked: !this.state.isChecked });
   }
   deleteCard() {
      if (this.props.editableCard.prevRoute === "/review-answer") {
         this.deleteCardFromStore();
      }
      if (this.props.editableCard.prevRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }
   deleteCardFromStore() {
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      const filteredCards = without(cards, deletedCard);
      console.log(filteredCards);

      this.props.dispatch({
         type: actions.STORE_QUEUED_CARDS,
         payload: filteredCards,
      });
      if (filteredCards[this.props.queue.index] === undefined) {
         this.props.history.push("/review-empty");
      } else {
         this.props.history.push("/review-imagery");
      }
   }

   changeRoute(prevRoute) {
      if (this.props.queue.cards[this.props.queue.index] === undefined) {
         return "/review-empty";
      }
      if (prevRoute === "/review-answer") {
         return "/review-imagery";
      }
   }
   render() {
      return (
         <AppTemplate>
            <h4 className="my-4 text-center text-muted">Edit card</h4>

            {isEmpty(this.props.editableCard) === false && (
               <>
                  <div className="mb-2">
                     <div className="card bg-primary">
                        <div className="card-body secondCard">
                           <textarea
                              className="w-100 d-sm-nope"
                              rows="11"
                              defaultValue={
                                 this.props.editableCard.card.imagery
                              }
                              onChange={(e) => this.setImageryText(e)}
                           ></textarea>
                        </div>
                     </div>
                     <div className="card bg-secondary">
                        <div className="card-body secondCard">
                           <textarea
                              className="w-100 d-sm-nope"
                              rows="5"
                              defaultValue={this.props.editableCard.card.answer}
                              onChange={(e) => this.setAnswerText(e)}
                           ></textarea>
                        </div>
                     </div>
                  </div>
                  <p className="float-right mb-5">
                     <span
                        className={classnames({
                           "text-danger": checkIsOver(
                              this.state.imageryText,
                              MAX_CARD_CHARS
                           ),
                        })}
                     >
                        top: {this.state.imageryText.length}/{MAX_CARD_CHARS}
                     </span>
                     &nbsp;&nbsp;&nbsp;
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
                     to={this.props.editableCard.prevRoute}
                     className="btn btn-link"
                  >
                     Discard changes
                  </Link>
                  <Link
                     to={this.props.editableCard.prevRoute}
                     id="save-imagery"
                     className={classnames(
                        "btn btn-primary btn-lg float-right",
                        {
                           disabled: this.checkHasInvalidCharCount(),
                        }
                     )}
                  >
                     <img
                        className="mb-1"
                        src={saveIcon}
                        width="20px;"
                        style={{ marginTop: "5px", marginRight: "8px" }}
                        alt=""
                     />
                     Save
                  </Link>
                  <h4 className="text-center mt-5 text-muted">
                     Card properties
                  </h4>
                  <div className="row mt-5">
                     <p className="text-muted col-4 mb-5">
                        Created: <br />
                        Last attempt: <br />
                        Next attempt: <br />
                        Consecutives:
                        <br />
                     </p>

                     <p className="col-5">
                        {toDisplayDate(
                           this.props.editableCard.card.createdAt,
                           "MMM. d, y"
                        )}
                        <br />
                        {toDisplayDate(
                           this.props.editableCard.card.lastAttemptAt,
                           "MMM. d, y"
                        )}
                        <br />
                        {toDisplayDate(
                           this.props.editableCard.card.nextAttemptAt,
                           "MMM. d, y"
                        )}
                        <br />
                        {this.props.editableCard.card.totalSuccessfulAttempts}
                        <br />
                     </p>

                     <div className="custom-control custom-checkbox col-12 mb-2">
                        <input
                           type="checkbox"
                           className="custom-control-input"
                           id="customCheck1"
                           defaultChecked={this.state.isChecked}
                           onClick={() => {
                              this.isDeleteButtonShown();
                           }}
                        />
                        <label
                           className="custom-control-label"
                           htmlFor="customCheck1"
                        >
                           Show delete button
                        </label>
                     </div>
                     {this.state.isChecked && (
                        <button
                           id="delete-card"
                           className="btn btn-outline-danger btn-lg "
                           onClick={() => {
                              this.deleteCard();
                           }}
                        >
                           Delete this card
                        </button>
                     )}
                  </div>
               </>
            )}
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      editableCard: state.editableCard,
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(Edit);
