//  users memory-cards page
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");

// @route   GET api/v1/memory-cards
// @desc    Get all memorycards for a user by a search term and order
// @address Public

router.get("/", (req, res) => {
   console.log("request", req.query);

   const { userId, searchTerm, order } = req.query;
   let construcedSearchTerm;
   if (searchTerm === "" || searchTerm === undefined) {
      construcedSearchTerm = `%%`;
   } else {
      construcedSearchTerm = `%${searchTerm}%`;
   }
   //    https://www.npmjs.com/package/mysql#escaping-query-values
   db.query(selectAllCards, [
      userId,
      construcedSearchTerm,
      construcedSearchTerm,
      { toSqlString: () => order },
   ])
      .then((memoryCards) => {
         const camelCaseMemoryCards = memoryCards.map((memoryCard) => {
            return {
               id: memoryCard.id,
               imagery: memoryCard.imagery,
               answer: memoryCard.answer,
               userId: memoryCard.user_id,
               createdAt: memoryCard.created_at,
               nextAttemptAt: memoryCard.next_attempt_at,
               lastAttemptAt: memoryCard.last_attempt_at,
               totalSuccessfulAttempts: memoryCard.total_successful_attempts,
               level: memoryCard.level,
            };
         });
         res.json(camelCaseMemoryCards);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
