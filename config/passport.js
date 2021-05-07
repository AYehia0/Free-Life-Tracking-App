const localStratgy = require("passport-local").Strategy; // login staratgy
const mongoose = require("mongoose"); // for finding user in the db
const bcrypt = require("bcryptjs"); // for decrypting the password

// the user db model
const User = require("../models/user");

module.exports = function(passport){
    passport.use(
        new localStratgy({usernameField:"email"}, (email, password, done) => {
            // check if there's a user with that email
            User.findOne({email: email})
            .then(user => {
                if(!user) {
                    console.log("not found")
                    return done(null, false, {errorLoginMsg: "Email isn't registered !!"})

                }
                // match the password
                bcrypt.compare(password, user.password, (err, success)=>{
                   if(err){
                       throw err;
                   }
                   if(success){
                       //console.log(user.email)
                       return done(null, user);

                   }
                    return done(null, false, {errorLoginMsg: "Incorrect Password"});
                })
            })
            .catch(err => console.log(err))
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
  });
}


