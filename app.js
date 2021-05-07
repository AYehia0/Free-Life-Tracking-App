const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")
const app = express();

//routers 
const foodRoute = require("./routes/foods");
const blogRoute = require("./routes/blog");
const profileRoute = require("./routes/profile");
const dashboardRoute = require("./routes/dashboard");
const homeRoute = require("./routes/home")
const registerRoute = require("./routes/register");
const loginRotue = require("./routes/login")
const logoutRoute = require("./routes/logout")


// MiddleWares
app.use(express.static(__dirname + '/public')); //Serves resources from static files 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Express session 
app.use(session({
    secret: "ilovecats",
    resave: true,
    saveUninitialized: true,

    // maxAge is in ms and it's for testing only, idk yet what it should be.
    cookie: { maxAge: 6000000 }
}))

// passport config
require("./config/passport")(passport)
app.use(passport.initialize());
app.use(passport.session());

// Flash 
app.use(flash());

// Global var for chooseing colors
app.use( (req, res, next) => {
    res.locals.successMsg = req.flash("successMsg");
    res.locals.errorMsg = req.flash("errorMsg");
    res.locals.errorLoginMsg = req.flash("errorLoginMsg");
    next();
})

app.use(morgan("dev"));
app.set('view engine', 'ejs');

// Routes 
app.use("/", homeRoute);
app.use("/foods", foodRoute);
app.use("/blog", blogRoute);
app.use("/profile", profileRoute);
app.use("/dashboard", dashboardRoute);
app.use("/register", registerRoute);
app.use("/login", loginRotue);
app.use("/logout", logoutRoute);

// Connecting to the database
mongoose.connect('mongodb://localhost:27017/free',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})

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