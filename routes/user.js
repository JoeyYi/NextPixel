var express = require("express");
var router  = express.Router({mergeParams: true});
var Post    = require("../models/post");
var Comment = require("../models/comment");
var User    = require("../models/user");
var middleware = require("../middleware") //index.js

//USER ROUTES

router.get("/:id", function(req,res){
    User.findById(req.params.id).populate("favorites").exec(function(err,foundUser){
        foundUser.favorites.forEach(function(post){
            post.description = post.description.substring(0,50) + "...";
        })
        res.render("showuser",{user:foundUser});
    });
});



module.exports = router;