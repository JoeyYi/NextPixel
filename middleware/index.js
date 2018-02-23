var Post = require("../models/post");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkPostOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err,foundPost){
            if(err || !foundPost) {
                req.flash("flash", "Post not found");
                res.redirect("back");
            } else {
                if(foundPost.user.id.equals(req.user._id)){
                    //foundPost.user.id: mongoose obj
                    //req.user._id: string
                    next();
                } else {
                    req.flash("flash", "You don't have permission to do that");
                    res.redirect("back");
                }    
            }
        });
    } else {
        req.flash("flash", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid, function(err,foundComment){
            if(err || !foundComment) {
                console.log(err);
                res.redirect("back");
            } else {
                if(foundComment.user.id.equals(req.user._id)){
                    //foundComment.user.id: mongoose obj
                    //req.user._id: string
                    next();
                } else {
                    req.flash("flash", "You don't have permission to do that");
                    res.redirect("back");
                }    
            }
        });
    } else {
        req.flash("flash", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("flash", "You need to be loged in to do that")
    res.redirect("/login");
}


module.exports = middlewareObj;