// route to handle : profile/edit .... to show[GET], edit[PUT]
const express = require("express");
const {ensureAuth} = require("../config/auth")
const bodyThings = require("../models/bodySpecific")
const router  = express.Router();
const User = require("../models/user")
const Bodythings = require("../models/bodySpecific")

//showing the profile page
const VALID_PASSWORD_LEN = process.env.PASS_LEN

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
            username: req.user.name
        })
})

router.post("/edit", ensureAuth, (req, res, next) => {

    const {name, age, password1, password2, height, weight, activity} = req.body;

    // SomeValidation blah blah
    // a Goog practice is to make a function for validation and use it for register and edit ,,,  will do it later

    // Checking for errors
    let errors = [];

    // Checking empty fields 
    if (name || age || (password1 && password2) || height || weight || activity) {
        if (password1 !== password2) {
            errors.push({errMsg: "Passwords aren't the same!!!"});
        }
        if (password1 && password2){
            if (password1.length < VALID_PASSWORD_LEN || password2.length < VALID_PASSWORD_LEN ){
                errors.push({errMsg: "Check password length > 4"});
            }
        }
        
        if (errors.length > 0) {
            // If there are errors re-render the page 
            return res.render("../views/editProfile", {
                errors,
                name, age, password1, password2, height, weight, activity,
                user: req.user,
                username: req.user.name
            }) 
        } else {
            // Update the database
            // then redirect to profile page
            User.findOneAndUpdate({email: req.user.email}, {
                name: name,
                password: password1
            })


        }       

    }else{
        errors.push({errMsg: "Change at least one thing"});
        // If there are errors re-render the page 
        return res.render("../views/editProfile", {
            errors,
            name, age, password1, password2, height, weight, activity,
            user: req.user,
            username: req.user.name
        }) 
    }

})
// editing the profile page
router.patch("/:profileId", (req, res, next)=> {
    const profileID = req.params.profileId;
    res.status(200).json({"message" : `editing profile ${profileID}`})
});

module.exports = router;