module.exports = {
    ensureAuth: function (req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }else{
            req.flash("errorMsg", "Login First");
            res.redirect("/login")
        }
   }
}