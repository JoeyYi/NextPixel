var express    = require("express");
    app        = express();
    request    = require("request");
    ejs        = require("ejs");
    bodyParser = require("body-parser");
    mongoose   = require("mongoose");
    Post       = require("./models/post");
    Comment    = require("./models/comment");
    seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost/project",function(err){
    if(err){
        console.log("DB error");
        console.log(err);
    }else{
        console.log("DB connected");
    }
});

seedDB();


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

//INDEX
app.get("/",function(req,res){
    res.render("home");
});

app.get("/posts",function(req,res){
    Post.find({},function(err,allPosts){
        if(err){
            console.log("failed to get all posts");
            console.log(err);
        }else{
            res.render("index",{list:allPosts});
        }
    });
    
});

//CREATE

app.get("/posts/new",function(req,res){
    res.render("newpost");
})

app.post("/posts",function(req,res){
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.description;
    var newPost = {name:name, img:img, description:desc};
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
app.get("/posts/:id",function(req,res){
    Post.findById(req.params.id).populate("comments").exec(function(err,foundPost){
        if(err) {
            console.log(err);
        } else {
            res.render("show",{post:foundPost});
        }
    });
});

//COMMENT ROUTES

app.get("/posts/:id/comments/new",function(req,res){
    Post.findById(req.params.id,function(err,post){
        if (err){
            console.log(err);
        } else {
            res.render("newcomment",{post:post});
        }
    });
});

app.post("/posts/:id/comments",function(req,res){
    var body = 
    Post.findById(req.params.id,function(err,foundPost){
        if(err){
            console.log(err);
            res.redirect("/posts/" + req.params.id);
        } else {
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    foundPost.comments.push(comment);
                    foundPost.save();
                    res.redirect("/posts/" + req.params.id);
                }
            })
        }
    });
});

app.listen(3000, function(){
    console.log("Serving at port 3000");
});