var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    session = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Post = require("./models/post"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    app = express();

//APP CONFIG
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/read_me", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

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
next();
});

//seedDB();

//ROOT ROUTE
app.get("/", function(req, res) {
    res.redirect("/posts");
});

//============
//POSTS ROUTES
//============

//INDEX ROUTE
app.get("/posts", function(req, res) {
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else{
            res.render("index", {posts: allPosts});
        }
    });
});

//NEW ROUTE
app.get("/posts/new", isLoggedIn, function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/posts", isLoggedIn, function(req, res){
    req.body.post.body = req.sanitize(req.body.post.body);
    Post.create(req.body.post, function(err, newPost){
        if(err){
            console.log(err);
        } else{
            newPost.author.id = req.user._id;
            newPost.author.username = req.user.username;
            newPost.save();
            res.redirect("/posts");
        }
    });
});

//SHOW ROUTE
app.get("/posts/:id", function(req, res) {
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else{
            res.render("show", {post: foundPost});
        }
    });
});

//EDIT ROUTE
app.get("/posts/:id/edit", checkPostOwnership, function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
        } else{
            res.render("edit", {post: foundPost});
        }
    });
});

//UPDATE ROUTE
app.put("/posts/:id", checkPostOwnership, function(req, res){
    req.body.post.body = req.sanitize(req.body.post.body);
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            console.log(err);
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
app.delete("/posts/:id", checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect("/posts");
        }
    });
});

//===============
//COMMENTS ROUTES
//===============


//NEW ROUTE
app.get("/posts/:id/comments/new", isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, foundPost) {
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {post: foundPost});
        }
    });
});

//CREATE ROUTE
app.post("/posts/:id/comments", isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
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
app.get("/posts/:id/comments/:comment_id/edit", checkCommentOwnership, function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if(err){
            console.log(err);
        } else{
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err){
                    console.log(err);
                } else{
                    res.render("comments/edit", {post: foundPost, comment: foundComment});
                }
            });
        }
    });
});

//UPDATE ROUTE
app.put("/posts/:id/comments/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
app.delete("/posts/:id/comments/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//===========
//AUTH ROUTES
//===========


//REGISTER ROUTES

app.get("/register", function(req,res){
    res.render("register", {page: "register"});
});

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
        res.redirect("/posts");
        });
    });
});

//LOGIN ROUTES

app.get("/login", function(req, res) {
    res.render("login", {page: "login"});
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}), function(req, res){});


//LOGOUT ROUTE
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/posts");
});

//MIDDLEWARES

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

function checkPostOwnership(req, res, next){
    if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err, foundPost){
            if(err || !foundPost){
                res.redirect("back");
            } else{
                if(foundPost.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("/login");
    }
}

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("/login");
    }
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});