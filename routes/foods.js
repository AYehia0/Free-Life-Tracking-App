// route to handle : foods/{food_id} ... add new food /foods/food:id/add [POST] , edit a food [PUT] or remove a food
const express = require("express");
const router  = express.Router();

router.get("/", (req, res, next)=> {
    res.status(200).json({"message" : "food"})
});

router.get("/", (req, res, next)=> {
    res.status(200).json({"message" : "food"})
});


module.exports = router;