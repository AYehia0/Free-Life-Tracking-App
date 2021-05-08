// route to handle : profile/edit .... to show[GET], edit[PUT]
const express = require("express");
const {ensureAuth} = require("../config/auth")
const router  = express.Router();

//showing the profile page
router.get("/", ensureAuth, (req, res, next)=> {
    res.render("../views/profile", {
        username: req.user.name,
        user: req.user
    })
});

//editing the profile page
router.patch("/:profileId", (req, res, next)=> {
    const profileID = req.params.profileId;
    res.status(200).json({"message" : `editing profile ${profileID}`})
});

module.exports = router;