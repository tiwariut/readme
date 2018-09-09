var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    session = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash = require("connect-flash"),
    Post = require("./models/post"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    middleware = require("./middleware"),
    app = express();

//REQUIRING ROUTES

var indexRoutes = require("./routes/index"),
    postRoutes = require("./routes/posts"),
    userRoutes = require("./routes/users");

//APP CONFIG
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/read_me", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment")

//PASSPORT CONFIG
app.use(session({
    secret : "Just do it!",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//seedDB();

app.use("/", indexRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

//===============
//COMMENTS ROUTES
//===============


//NEW ROUTE
app.get("/posts/:id/comments/new", middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, foundPost) {
        if(err){
            req.flash("error", "Post not found.");
            res.redirect("back");
            console.log(err);
        } else{
            res.render("comments/new", {post: foundPost});
        }
    });
});

//CREATE ROUTE
app.post("/posts/:id/comments", middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            req.flash("error", "Post not found.");
            res.redirect("back");
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    req.flash("error", "Not able to create your comment.");
                    res.redirect("back");
                    console.log(err);
                } else{
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundPost.comments.push(newComment);
                    foundPost.save();
                    res.redirect("/posts/" + req.params.id);
                }
            });
        }
    });
});

//EDIT ROUTE
app.get("/posts/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if(err){
            req.flash("error", "Post not found.");
            res.redirect("back");
            console.log(err);
        } else{
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err){
                    req.flash("error", "Comment not found.");
                    res.redirect("back");
                    console.log(err);
                } else{
                    res.render("comments/edit", {post: foundPost, comment: foundComment});
                }
            });
        }
    });
});

//UPDATE ROUTE
app.put("/posts/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "Comment not found.");
            res.redirect("back");
            console.log(err);
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
app.delete("/posts/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Comment not found.");
            res.redirect("back");
            console.log(err);
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});
