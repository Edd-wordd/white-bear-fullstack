import React from "react";
import AppTemplate from "../UI/appTemplate";
import MemoryCard from "../UI/MemoryCard";
import orderBy from "lodash/orderBy";
import axios from "axios";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         order: '[["createdAt"], ["desc"]]',
         displayedMemoryCards: [],
         allMemoryCards: [],
      };
   }

   componentDidMount() {
      axios
         .get(
            "http://localhost:3045/api/v1/memory-cards?userId=8c3ee2c4-d34d-4fe1-a438-e9ea9271c910&&order=%60memory_cards%60.%60created_at%60%20DESC"
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            const memoryCards = res.data;
            this.setState({
               displayedMemoryCards: orderBy(
                  memoryCards,
                  ["createdAt"],
                  ["desc"]
               ),
               allMemoryCards: orderBy(memoryCards, ["createdAt"], ["desc"]),
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   filterByInput() {
      const input = document.getElementById("search-input").value;
      const lowerCasedInput = input.toLowerCase();
      const copyOfAllMemoryCards = [...this.state.allMemoryCards];
      const filteredMemoryCards = copyOfAllMemoryCards.filter((memoryCard) => {
         const lowerCasedImagery = memoryCard.imagery.toLowerCase();
         const lowerCasedAnswer = memoryCard.answer.toLowerCase();
         if (
            lowerCasedImagery.includes(lowerCasedInput) ||
            lowerCasedAnswer.includes(lowerCasedInput)
         ) {
            return true;
         } else return false;
      });
      this.setState({ displayedMemoryCards: filteredMemoryCards }, () => {
         this.setMemoryCards();
      });
   }

   setOrder(e) {
      const newOrder = e.target.value;
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      const copyOfDisplayedMemoryCards = [...this.state.displayedMemoryCards];
      const toJson = JSON.parse(this.state.order);
      const orderedMemoryCards = orderBy(copyOfDisplayedMemoryCards, ...toJson);
      this.setState({ displayedMemoryCards: orderedMemoryCards });
   }

   render() {
      return (
         <AppTemplate>
            <div className="row mb-3">
               <div className="col-8">
                  <input
                     className="form-control form-control-sm"
                     type="text"
                     placeholder="Search for a word"
                     aria-label="Search"
                     id="search-input"
                  />
               </div>
               <div className="col-4">
                  <button
                     className="btn btn-secondary btn-sm btn-block"
                     id="searchBtn"
                     onClick={() => this.filterByInput()}
                  >
                     Search
                  </button>
               </div>
            </div>
            <div className="row">
               <div className="col-6">
                  <p>Sort cards by</p>
               </div>

               <div className="col-6">
                  <select
                     className="custom-select mb-5 border"
                     value={this.state.order}
                     onChange={(e) => this.setOrder(e)}
                  >
                     <option value='[["createdAt"],["desc"]]'>
                        Most recent
                     </option>
                     <option value='[["createdAt"],["asc"]]'>Oldest</option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"], ["asc", "asc"]]'>
                        Hardest
                     </option>
                     <option value='[["totalSuccessfulAttempts", "createdAt"], ["desc", "desc"]]'>
                        Easiest
                     </option>
                  </select>
               </div>
            </div>
            {this.state.displayedMemoryCards.map((memoryCard) => {
               return <MemoryCard cards={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
