// logout route
const express = require("express");
const router  = express.Router();

router.get("/", (req, res, next) => {
    req.logout();
    req.flash("successMsg", "Your are logged out");
    res.redirect("/login");
})

module.exports = router;