var express = require("express");
var router  = express.Router({mergeParams: true});
var Post    = require("../models/post");
var Comment = require("../models/comment");

//COMMENT ROUTES

router.get("/new",isLoggedIn, function(req,res){
    Post.findById(req.params.id,function(err,post){
        if (err){
            console.log(err);
        } else {
            res.render("newcomment",{post:post});
        }
    });
});

router.post("/",isLoggedIn, function(req,res){
    Post.findById(req.params.id,function(err,foundPost){
        if(err){
            console.log(err);
            res.redirect("/posts/" + req.params.id);
        } else {
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    //get current user's id and username
                    comment.user.id = req.user._id;
                    comment.user.username = req.user.username;
                    comment.save();//!!!IMPORTANT
                    //save comment
                    foundPost.comments.push(comment);
                    foundPost.save();
                    res.redirect("/posts/" + req.params.id);
                }
            })
        }
    });
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;