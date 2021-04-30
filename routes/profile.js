// route to handle : profile/edit .... to show[GET], edit[PUT]
const express = require("express");
const router  = express.Router();

//showing the profile page
router.get("/", (req, res, next)=> {
    res.status(200).json({"message" : "show profile"})
});

//editing the profile page
router.patch("/:profileId", (req, res, next)=> {
    const profileID = req.params.profileId;
    res.status(200).json({"message" : `editing profile ${profileID}`})
});

module.exports = router;