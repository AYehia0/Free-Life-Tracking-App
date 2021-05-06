// To handling login
const express = require("express");
const router  = express.Router();
const passport = require("passport");

router.get("/", (req, res, next)=> {
    res.render("../views/login");
});

router.post("/", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
})

module.exports = router;