var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride       = require("method-override"),
    Post = require("./models/post"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    app = express();

//APP CONFIG
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/read_me", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

seedDB();

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
app.get("/posts/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/posts", function(req, res){
    req.body.post.body = req.sanitize(req.body.post.body);
    Post.create(req.body.post, function(err, newPost){
        if(err){
            console.log(err);
        } else{
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
app.get("/posts/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
        } else{
            res.render("edit", {post: foundPost});
        }
    });
});

//UPDATE ROUTE
app.put("/posts/:id", function(req, res){
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
app.delete("/posts/:id", function(req, res){
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
app.get("/posts/:id/comments/new", function(req, res){
    Post.findById(req.params.id, function(err, foundPost) {
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {post: foundPost});
        }
    });
});

//CREATE ROUTE
app.post("/posts/:id/comments", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
        } else{
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err);
                } else{
                    foundPost.comments.push(newComment);
                    foundPost.save();
                    res.redirect("/posts/" + req.params.id);
                }
            });
        }
    });
});

//EDIT ROUTE
app.get("/posts/:id/comments/:comment_id/edit", function(req, res) {
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
app.put("/posts/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});