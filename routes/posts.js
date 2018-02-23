var express    = require("express");
var router     = express.Router();
var Post       = require("../models/post");
var Comment    = require("../models/comment");
var middleware = require("../middleware") //index.js

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

router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("newpost");
})

//CREATE
router.post("/",middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.description;
    var user = { id: req.user._id, username: req.user.username};
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
        if(err || !foundPost) {
            console.log(err);
        } else {
            res.render("show",{post:foundPost});
        }
    });
});

//EDIT
router.get("/:id/edit", middleware.checkPostOwnership, function(req,res){
        Post.findById(req.params.id, function(err,foundPost){
            if(err) {
                console.log(err);
            } else {
                res.render("editpost",{post:foundPost});
                
            }
        });
});

//UPDATE
router.put("/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndUpdate(req.params.id,req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("/posts/" + req.params.id);
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        } else {
            res.redirect("/posts");
        }
    });
});


module.exports = router;