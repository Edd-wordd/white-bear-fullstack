//  users memory-cards page
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");

// @route   GET api/v1/memory-cards
// @desc    Get all memorycards for a user by a search term and order
// @address Public

router.get("/", (req, res) => {
   db.query(
      selectAllCards(
         "8c3ee2c4-d34d-4fe1-a438-e9ea9271c910",
         "ven",
         "`memory_cards`.`created_at` DESC"
      )
   )
      .then((dbRes) => {
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
