var express          = require("express"),
    app              = express(),
    request          = require("request"),
    ejs              = require("ejs"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    localStrategy    = require("passport-local"),
    Post             = require("./models/post"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    seedDB           = require("./seeds"),
    methodOverride   = require("method-override"),
    flash            = require("connect-flash");

//requiring routes
var postRoutes     = require("./routes/posts"),
    commentRoutes  = require("./routes/comments"),
    userRoutes     = require("./routes/user"),
    indexRoutes    = require("./routes/index");


dburl = process.env.DATABASEURL || "mongodb://localhost/project";
mongoose.connect(dburl,function(err){
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
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "This is so confusing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //pass passport user object{username, _id} to res.locals for each route
    res.locals.flash = req.flash("flash");
    //flash message
    next();
})


app.use("/", indexRoutes);
app.use("/posts", postRoutes);
app.use("/posts/:id/comments", commentRoutes);
app.use("/users", userRoutes);


app.listen(process.env.PORT || 3000, function(){
    console.log("Serving at port 3000");
});