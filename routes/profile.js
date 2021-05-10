// route to handle : profile/edit .... to show[GET], edit[PUT]
const express = require("express");
const {ensureAuth} = require("../config/auth")
const bodyThings = require("../models/bodySpecific")
const router  = express.Router();

//showing the profile page

router.get("/", ensureAuth, (req, res, next)=> {

    bodyThings.find({user:req.user}).then(user => {
        if (user) {
            res.render("../views/profile", {
                username: req.user.name,
                user: req.user,
                bodythings: user[0] 
            })
        }
    }).catch(err => {
        console.log(err)
    })
});

router.get("/edit", ensureAuth, (req, res, next) => {

    res.render("../views/editProfile", {
            user: req.user,
            name: req.name,
            
        })
})

// router.post("/edit", ensureAuth, (req, res, next) => {
//     // change user's info 
//     // /profile/edit

// })
//editing the profile page
router.patch("/:profileId", (req, res, next)=> {
    const profileID = req.params.profileId;
    res.status(200).json({"message" : `editing profile ${profileID}`})
});

module.exports = router;