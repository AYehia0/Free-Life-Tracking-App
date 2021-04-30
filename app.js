const express = require("express");
const app = express();

//routers 
const foodRoute = require("./routes/foods");
const blogRoute = require("./routes/blog");
const profileRoute = require("./routes/profile");
const dashboardRoute = require("./routes/dashboard");

// MiddleWares 
app.use("/foods", foodRoute);
app.use("/blog", blogRoute);
app.use("/profile", profileRoute);
app.use("/dashboard", dashboardRoute);

app.get("/", (req, res, next) => {
    res.status(200).json({"message":"Home page"});
});


module.exports = app;