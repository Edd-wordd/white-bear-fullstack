import React from "react";
import AppTemplate from "../UI/appTemplate";
import MemoryCard from "../UI/MemoryCard";
import axios from "axios";

export default class AllCards extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         order: "memory_cards.created_at%20DESC",
         memoryCards: [],
         searchTerm: "",
      };
   }

   componentDidMount() {
      this.setMemoryCards();
   }

   setOrder(e) {
      const newOrder = e.target.value;
      this.setState({ order: newOrder }, () => {
         this.setMemoryCards();
      });
   }
   setSearchTerm() {
      const searchInput = document.getElementById("search-input").value;
      this.setState({ searchTerm: searchInput }, () => {
         this.setMemoryCards();
      });
   }

   setMemoryCards() {
      axios
         .get(
            `/api/v1/memory-cards?userId=8c3ee2c4-d34d-4fe1-a438-e9ea9271c910&searchTerm=${this.state.searchTerm}&order=${this.state.order}`
         )
         .then((res) => {
            // handle success
            console.log(res.data);
            this.setState({
               memoryCards: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
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
                     onClick={() => this.setSearchTerm()}
                  >
                     Search
                  </button>
               </div>
            </div>
            <div className="row">
               <div className="col-6">
                  <p className="text-danger">Sort cards by</p>
               </div>

               <div className="col-6">
                  <select
                     className="custom-select mb-5 border"
                     value={this.state.order}
                     onChange={(e) => this.setOrder(e)}
                  >
                     <option value="memory_cards.created_at%20DESC">
                        Most recent
                     </option>
                     <option value="memory_cards.created_at%20ASC">
                        Oldest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20ASC,%20memory_cards.created_at%20ASC">
                        Hardest
                     </option>
                     <option value="memory_cards.total_successful_attempts%20DESC,%20memory_cards.created_at%20DESC">
                        Easiest
                     </option>
                  </select>
               </div>
            </div>
            {this.state.memoryCards.map((memoryCard) => {
               return <MemoryCard cards={memoryCard} key={memoryCard.id} />;
            })}
         </AppTemplate>
      );
   }
}
