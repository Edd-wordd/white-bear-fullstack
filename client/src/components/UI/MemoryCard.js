import React from "react";
import { Link } from "react-router-dom";
import editIcon from "../../icons/edit.svg";
import actions from "../../store/actions";
import { connect } from "react-redux";

class MemoryCard extends React.Component {
   storeEditableCard() {
      console.log("storing editable card");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: {
            card: this.props.cards,
            prevRoute: "/all-cards",
         },
      });
   }
   render() {
      return (
         <div className="row">
            <div className="card bg-primary col-9 offset-1">
               <div className="card-body secondCard">
                  {this.props.cards.imagery}
               </div>
            </div>
            <Link
               to="/edit"
               className="btn btn-link col-2"
               onClick={() => {
                  this.storeEditableCard();
               }}
            >
               <img src={editIcon} width="20px" alt="" />
               Edit
            </Link>

            <div className="card bg-secondary col-9 offset-1 mb-5">
               <div className="card-body secondCard">
                  {this.props.cards.answer}
               </div>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {};
}
export default connect(mapStateToProps)(MemoryCard);
