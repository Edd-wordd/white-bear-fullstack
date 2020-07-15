import React from "react";
import thumbsUpIcon from "../../icons/thumbs-up.svg";
import AppTemplate from "../UI/appTemplate";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";
// import axios from "axios";

class ReviewAnswer extends React.Component {
   constructor(props) {
      super(props);
      if (this.props.queue.cards.length === 0) {
         this.props.history.push("/review-empty");
      }
      // axios
      //    .get(
      //       "https://raw.githubusercontent.com/Edd-wordd/white-bear-mpa/master/src/mock%20data/memory-card.JSON"
      //    )
      //    .then(function (response) {
      //       // handle success
      //       console.log(response);
      //    })
      //    .catch(function (error) {
      //       // handle error
      //       console.log(error);
      //    });
   }

   goToNextCard() {
      if (this.props.queue.index === this.props.queue.cards.length - 1) {
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });

         this.props.history.push("/review-empty");
      } else {
         this.props.dispatch({ type: actions.INCREMENT_QUEUE_INDEX });
         this.props.history.push("/review-imagery");
      }
   }
   storeEditableCard() {
      console.log("storing editable card");
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: memoryCard,
            prevRoute: "/review-answer",
         },
      });
   }
   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      console.log("hi", memoryCard);

      return (
         <AppTemplate>
            <div className="mb-5">
               <div className="card bg-primary">
                  <div className="card-body secondCard">
                     {memoryCard && memoryCard.imagery}
                  </div>
               </div>
               <div className="card bg-secondary">
                  <div className="card-body secondCard">
                     {memoryCard && memoryCard.answer}
                  </div>
               </div>
            </div>
            <Link
               to="/edit"
               className="btn btn-link"
               onClick={() => {
                  this.storeEditableCard();
               }}
            >
               Edit card
            </Link>
            <div className="float-right">
               <button
                  onClick={() => {
                     this.goToNextCard();
                  }}
                  className="btn btn-outline-primary mr-1 "
               >
                  Needs Work
               </button>
               <button
                  className="btn btn-primary"
                  onClick={() => {
                     this.goToNextCard();
                  }}
               >
                  <img
                     className="mb-2"
                     src={thumbsUpIcon}
                     width="20px;"
                     style={{ marginRight: "7px" }}
                     alt=""
                  />
                  Got it
               </button>
            </div>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   return {
      queue: state.queue,
   };
}
export default connect(mapStateToProps)(ReviewAnswer);
