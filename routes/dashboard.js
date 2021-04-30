// showing the loss weight process + some charts etc...
const express = require("express");
const router  = express.Router();

router.get("/", (req, res, next)=> {
    res.status(200).json({"message" : "dashboard"})
});

module.exports = router;