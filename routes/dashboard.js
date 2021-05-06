// showing the loss weight process + some charts etc...
const express = require("express");
const {ensureAuth} = require("../config/auth")
const router  = express.Router();

router.get("/" , ensureAuth, (req, res, next)=> {
    res.render("../views/dashboard", {
        username: req.user.name
    })
});

module.exports = router;