// Register thing handling
const express = require("express");
const User = require("../models/user");
const Bodythings = require("../models/bodySpecific");
const bcrypt = require("bcryptjs");
const router  = express.Router();

// For dev purposes only
const VALID_PASSWORD_LEN = process.env.PASS_LEN

router.post("/", (req, res, next) => {
    // Getting form input to save in db
    const {name, email, phone, age, password1, password2, height, weight, activity} = req.body;

    // Checking for errors
    let errors = [];

    // Checking empty fields 
    if (!name || !email || !phone || !age || !password1 || !password2 || !height || !weight || !activity) {
        errors.push({errMsg: "Missing fields"});
    }

    if (password1 !== password2) {
        errors.push({errMsg: "Passwords aren't the same!!!"});
    }

    if (password1.length < VALID_PASSWORD_LEN || password2.length < VALID_PASSWORD_LEN){
        errors.push({errMsg: "Check password length > 4"});
    }

    if (errors.length > 0) {
       // If there are errors re-render the page 
       return res.render("../views/register", {
           errors,
           name, email, phone, age, password1, password2, height, weight, activity
        }) 
    } else {
        // Validation OK
        // Saving to db, before encrypting 

        // Checking if User exists
        User.findOne({email: email})
        .then( user => {
            if(user) {

                console.log("User exists")
                //User is in the db
                errors.push({errMsg: "User is already there!!!"});

                // Render the page
                return res.render("../views/register", {
                    errors,
                    name, email, phone, age, password1, password2, height, weight, activity 
                })

            }else{     
                console.log("User doesn't exist")
                // User dosn't exist 
                // Create a new one 
                const newUser = new User({
                    email: email,
                    name: name,
                    password: password1,
                    phone: phone
                })
                // adding the body things 
                const userBodyMeg = new Bodythings({
                    age: age,
                    height: height,
                    weight: weight,
                    activity: activity,
                    user: newUser._id
                })
                    
                // encrypting the user's password
                bcrypt.genSalt(10, (error, salt) => bcrypt.hash(newUser.password, salt, (error, hash) => {
                            if(error) throw error;

                            //setting the new user's password to the hased
                            newUser.password = hash;

                            userBodyMeg
                            .save()
                            newUser.save()
                            .then( user => {

                                //redirecting to login page
                                req.flash("successMsg", "You are now registered !!");
                                res.redirect("/login")
                            })
                    }))
            }
        })

    }

});

module.exports = router;
