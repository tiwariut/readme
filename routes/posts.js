var express = require("express"),
    router = express.Router(),
    Post = require("../models/post");

//INDEX ROUTE
router.get("/posts", function(req, res) {
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else{
            res.render("index", {posts: allPosts});
        }
    });
});

//NEW ROUTE
router.get("/posts/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
router.post("/posts", function(req, res){
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
router.get("/posts/:id", function(req, res) {
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else{
            res.render("show", {post: foundPost});
        }
    });
});

//EDIT ROUTE
router.get("/posts/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
        } else{
            res.render("edit", {post: foundPost});
        }
    });
});

//UPDATE ROUTE
router.put("/posts/:id", function(req, res){
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
router.delete("/posts/:id", function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect("/posts");
        }
    });
});

module.exports = router;