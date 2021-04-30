const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mustache = require("ejs");
const app = express();


//routers 
const foodRoute = require("./routes/foods");
const blogRoute = require("./routes/blog");
const profileRoute = require("./routes/profile");
const dashboardRoute = require("./routes/dashboard");
const homeRoute = require("./routes/home")

// MiddleWares
app.use(express.static(__dirname + '/public')); //Serves resources from static files 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan("dev"));
app.set('view engine', 'ejs');
app.use("/", homeRoute);
app.use("/foods", foodRoute);
app.use("/blog", blogRoute);
app.use("/profile", profileRoute);
app.use("/dashboard", dashboardRoute);


//not a vaild url/route
app.use((req, res, next)=>{
    const err = new Error("not found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    // 500 for other related errors
    res.status(err.status || 500 )
    res.json({
        error: {
            message: err.message
        }
    })
});



module.exports = app;