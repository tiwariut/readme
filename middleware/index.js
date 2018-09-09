var Post = require("../models/post"),
    Comment = require("../models/comment");

var middleware = {
    isLoggedIn : function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } 
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("/login");
    },
    
    checkPostOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Post.findById(req.params.id, function(err, foundPost){
                if(err || !foundPost){
                    req.flash("error", "Post not found.");
                    res.redirect("back");
                    console.log(err);
                } else{
                    if(foundPost.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                    } else{
                        req.flash("error", "You don't have permission to that.");
                        res.redirect("back");
                    }
                }
            });
        } else{
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("/login");
        }
    },
    
    checkCommentOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err || !foundComment){
                    req.flash("error", "Comment not found.");
                    res.redirect("back");
                    console.log(err);
                } else{
                    if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                        next();
                    } else{
                        req.flash("error", "You don't have permission to that.");
                        res.redirect("back");
                    }
                }
            });
        } else{
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("/login");
        }
    }
};

module.exports = middleware;