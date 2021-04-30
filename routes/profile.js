// route to handle : profile/edit .... to show[GET], edit[PUT]
const express = require("express");
const router  = express.Router();

//showing the profile page
router.get("/", (req, res, next)=> {
    res.status(200).json({"message" : "show profile"})
});

//editing the profile page
router.put("/", (req, res, next)=> {
    res.status(200).json({"message" : "edit profile"})
});

module.exports = router;