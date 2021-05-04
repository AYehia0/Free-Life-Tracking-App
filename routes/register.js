// route to handle : foods/{food_id} ... add new food /foods/food:id/add [POST] , edit a food [PUT] or remove a food
const express = require("express");
const router  = express.Router();

router.post("/", (req, res, next) => {
    console.log(req.body)
    res.send("hello")
});

module.exports = router;
