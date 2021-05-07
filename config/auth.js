module.exports = {
    ensureAuth: function (req, res, next) {
        if(req.isAuthenticated()){
            res.locals.login = req.session.passport;
            return next()
        }else{
            req.flash("errorMsg", "Login First");
            res.redirect("/login")
        }
   }
}