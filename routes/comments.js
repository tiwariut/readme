var express = require("express"),
    router = express.Router(),
    Post = require("../models/post"),
    Comment = require("../models/post");

//NEW ROUTE
router.get("/posts/:id/comments/new", function(req, res){
    Post.findById(req.params.id, function(err, foundPost) {
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {post: foundPost});
        }
    });
});

//CREATE ROUTE
router.post("/posts/:id/comments", function(req, res){
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
router.get("/posts/:id/comments/:comment_id/edit", function(req, res) {
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
router.put("/posts/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/posts/:id/comments/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

module.exports = router;
