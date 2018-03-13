var express = require("express");
var router  = express.Router({mergeParams: true});
var Post    = require("../models/post");
var Comment = require("../models/comment");
var middleware = require("../middleware") //index.js

//COMMENT ROUTES

router.get("/new", middleware.isLoggedIn, function(req,res){
    Post.findById(req.params.id,function(err,post){
        if (err){
            console.log(err);
        } else {
            res.render("newcomment",{post:post});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
    Post.findById(req.params.id,function(err,foundPost){
        if(err){
            console.log(err);
            res.redirect("/posts/" + req.params.id);
        } else {
            req.body.comment.text = req.sanitize(req.body.comment.text) || "No content";
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    req.flash("flash", "Oops! Something went wrong...");
                    console.log(err);
                } else {
                    //get current user's id and username
                    comment.user.id = req.user._id;
                    comment.user.username = req.user.username;
                    comment.save();//!!!IMPORTANT
                    //save comment
                    foundPost.comments.push(comment);
                    foundPost.save();
                    req.flash("flash", "Comment created!");
                    res.redirect("/posts/" + req.params.id);
                }
            })
        }
    });
});

//EDIT

router.get("/:cid/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.cid, function(err, foundComment){
        if(err || !foundComment){
            res.redirect("back");
        } else {
            res.render("editcomment",{comment:foundComment, post_id: req.params.id})
        }
    });
});

router.put("/:cid", middleware.checkCommentOwnership, function(req, res){
    req.body.comment.text = req.sanitize(req.body.comment.text) || "No content";
    Comment.findByIdAndUpdate(req.params.cid, req.body.comment, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("flash", "Comment updated!");
            res.redirect("/posts/" + req.params.id);
        }
    });
});


//DESTROY

router.delete("/:cid", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.cid, function(err){
        if(err){
            res.redirect("/posts/" + req.params.id);
        } else {
            req.flash("flash", "Comment deleted!");
            res.redirect("/posts/" + req.params.id);
        }
    });
});


module.exports = router;