import React from "react";
import AppTemplate from "../UI/appTemplate";
import { Link } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class ReviewImagery extends React.Component {
   constructor(props) {
      super(props);
      if (props.queue.cards.length === 0) {
         axios
            .get(
               "https://raw.githubusercontent.com/Edd-wordd/white-bear-mpa/master/src/mock%20data/memory-card.JSON"
            )
            .then((res) => {
               // handle success
               console.log(res);
               props.dispatch({
                  type: actions.STORE_QUEUED_CARDS,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
      }

      if (props.queue.index > props.queue.cards.length) {
         this.props.history.push("/review-empty");
      }
   }

   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      return (
         <AppTemplate>
            <div className="mb-5">
               <div className="card bg-primary">
                  <div className="card-body secondCard">
                     {memoryCard && memoryCard.imagery}
                  </div>
               </div>
            </div>

            {this.props.queue.index > 0 && (
               <button
                  className="btn btn-link"
                  onClick={() => {
                     this.goToPrevCard();
                  }}
               >
                  Previous card
               </button>
            )}

            <div className="float-right">
               <Link
                  to="/review-answer"
                  className="btn btn-outline-primary btn-lg"
               >
                  Show answer
               </Link>
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
export default connect(mapStateToProps)(ReviewImagery);
