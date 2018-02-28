var express    = require("express");
var router     = express.Router();
var Post       = require("../models/post");
var Comment    = require("../models/comment");
var User       = require("../models/user");
var middleware = require("../middleware") //index.js
var mongoose   = require("mongoose");



//latest posts
router.get("/latest",function(req,res){
    Post.find({}).sort({"_id":-1}).limit(5).exec(function(err,foundPosts){
        if(err){
            console.log(err);
        }else{
            var data = "";
            foundPosts.forEach(function(post){
                img = "<div><img src='" + post.img + "'></div>";
                title = "<span><a href='" + post.id + "'>" + post.name + "</a></span>"; 
                excerpt = "<span>" + post.description + "</span>";                 
                data += "<div class='latest-item'>" + img + title + excerpt + "</div>";
            })
            res.send(data);
        }
    });
});

//get favorite
// router.get("/:id/fav",function(req,res){
//     Post.findById(req.params.id, function(err,foundPost){
//         if(err){
//             console.log(err);
//         }else {
//             res.send("<i class='fa fa-star-o' aria-hidden='true'></i> " + foundPost.favorites.toString());
//         }
//     });
// });

// //toggle favorite
// router.get("/:id/fav",function(req,res){
//     Post.findById(req.params.id, function(err,foundPost){
//         if(err){
//             console.log(err);
//         }else {
//             res.send("<i class='fa fa-star-o' aria-hidden='true'></i> " + foundPost.favorites.toString());
//         }
//     });
// });

//toggle favorite

router.get("/:id/fav", function(req,res){
    User.where("favorites").in([mongoose.Types.ObjectId(req.params.id)]).exec(function(err, foundUsers){
        if(err){
            console.log(err);
        } else {
            if(!req.user){         //not logged in
                return res.send("<i class='fa fa-star-o' aria-hidden='true'></i> " + foundUsers.length.toString());
            }
            var hasfavorited = foundUsers.some(function(user){
                return user._id.equals(req.user.id);
            });
            if(!hasfavorited){     //hasn't added to favorites      
            res.send("<i class='fa fa-star-o' aria-hidden='true'></i> " + foundUsers.length.toString());
            } else {               //has added to favorites
            res.send("<i class='fa fa-star' aria-hidden='true'></i> " + foundUsers.length.toString());   
            }
        }
    });
});

router.post("/:id/fav", function(req,res){
    User.where("favorites").in([mongoose.Types.ObjectId(req.params.id)]).exec(function(err, foundUsers){
        if(err){
            console.log(err);
        } else {
            var hasfavorited = foundUsers.some(function(user){
                return user._id.equals(req.user.id);
            });
            console.log(hasfavorited);
            User.findById(req.user.id,function(err,foundUser){
                if(!hasfavorited){   //add to favorites
                    foundUser.favorites.push({_id: req.params.id});
                    foundUser.save();
                    res.send("<i class='fa fa-star' aria-hidden='true'></i> " + (foundUsers.length + 1));
                } else {   //remove from favorites
                    var index;
                    foundUser.favorites.forEach(function(postId, i){
                        if(postId.equals(req.params.id)){index = i;}
                    })
                    console.log(foundUsers.length);
                    foundUser.favorites.splice(index, 1);
                    foundUser.save();
                    console.log(foundUsers.length);
                    res.send("<i class='fa fa-star-o' aria-hidden='true'></i> " + (foundUsers.length - 1));
                }
            });  
        }
    });
});

// router.get("/:id/a", function(req,res){
//     User.findById(req.user.id, function(err, foundUser){
//         if(err || !foundUser){
//             console.log(err);
//         } else {
//             console.log("FAVs: " + foundUser.favorites);
//             var favIndex;
//             var isInArray = foundUser.favorites.some(function(postObj,index){
//                 favIndex = index;
//                 return postObj.equals(req.params.id);
//             })
//             if(isInArray){

//             }

//         }
//     })
    

// });

// router.post("/:id/fav/:num", function(req,res){
//     User.findById(req.user.id, function(err, foundUser){
//         if(err || !foundUser){
//             console.log(err);
//         } else {
//             var hasfavorited = -1;
//             foundUser.favorites.forEach(function(favid, i){
//                 if(favid.equals(req.params.id)){ hasfavorited = i;}
//             });
//             console.log(hasfavorited);
//             if(hasfavorited < 0){
//                 // var newPost = new Post({_id: req.params.id});
//                 // newPost.save();
//                 foundUser.favorites.push({_id: req.params.id});
//                 foundUser.save();
//                 Post.findByIdAndUpdate(
//                     req.params.id, 
//                     {favorites: (parseInt(req.params.num) + 1)},
//                     {new: true},
//                     function(err, updatedPost){
//                         if(err){
//                             console.log(err);
//                         } else {
//                             res.send("<i class='fa fa-star' aria-hidden='true'></i> " + updatedPost.favorites.toString());
//                         }                      
//                 });            
//             } else {
//                 res.send("<i class='fa fa-star-o' aria-hidden='true'></i> " + req.params.num);
//             }
//         }

//     })
    

// });

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