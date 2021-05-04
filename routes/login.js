// To handling login
const express = require("express");
const router  = express.Router();

router.get("/", (req, res, next)=> {
    res.render("../views/login");
});

module.exports = router;