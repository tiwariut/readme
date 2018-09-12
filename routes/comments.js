var express = require("express"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware"),
    Post = require("../models/post"),
    Comment = require("../models/comment");

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    newComment.author.avatar = req.user.avatar;
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
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
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
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
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
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
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

module.exports = router;