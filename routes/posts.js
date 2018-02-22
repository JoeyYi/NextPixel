var express = require("express");
var router  = express.Router();
var Post    = require("../models/post");
var Comment = require("../models/comment");


//INDEX

router.get("/",function(req,res){
    Post.find({},function(err,allPosts){
        if(err){
            console.log("failed to get all posts");
            console.log(err);
        }else{
            res.render("index",{list:allPosts});
        }
    });
    
});

//NEW

router.get("/new",isLoggedIn, function(req,res){
    res.render("newpost");
})

//CREATE
router.post("/",isLoggedIn, function(req,res){
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.description;
    var user = { id: req.user.__id, username: req.user.username};
    var newPost = {name:name, img:img, description:desc, user:user};
    Post.create(newPost,function(err,created){
        if(err){
            console.log(err);
        }else{
            console.log(created);
        }
    });
    res.redirect("/posts");
});

//SHOW
router.get("/:id",function(req,res){
    Post.findById(req.params.id).populate("comments").exec(function(err,foundPost){
        if(err) {
            console.log(err);
        } else {
            res.render("show",{post:foundPost});
        }
    });
});

//EDIT
router.get("/:id/edit",isLoggedIn, function(req,res){
    Post.findById(req.params.id, function(err,foundPost){
        if(err) {
            console.log(err);
        } else {
            res.render("editpost",{post:foundPost});
        }
    });
})

//UPDATE
router.put("/:id",isLoggedIn, function(req, res){
    Post.findByIdAndUpdate(req.params.id,req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("/post/" + req.params.id);
        } else {
            res.redirect("/post/" + req.params.id);
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