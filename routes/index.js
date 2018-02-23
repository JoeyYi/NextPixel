var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//ROOT
router.get("/",function(req,res){
    res.render("home");
});

// AUTH ROUTES

//register
router.get("/register", function(req,res){
    res.render("register");
})

//handling register request
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("flash", "Error: " + err.massage);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("flash", "Welcome, " + user.username + "!");
            res.redirect("/posts");
        });
    });
});

//login
router.get("/login", function(req,res){
    res.render("login");
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/posts",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("flash", "Successfully logged out!");
    res.redirect("/posts");
})



module.exports = router;