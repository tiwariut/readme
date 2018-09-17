var express = require("express"),
    router = express.Router(),
    Post = require("../models/post");

router.get("/music", function(req, res){
    Post.find({category: "Music"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found.");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Music"});
            }
        }
    });
});

router.get("/fashion", function(req, res){
    Post.find({category: "Fashion"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found.");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Fashion"});
            }
        }
    });
});

router.get("/car", function(req, res){
    Post.find({category: "Car"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Car"});
            }
        }
    });
});

router.get("/travel", function(req, res){
    Post.find({category: "Travel"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Travel"});
            }
        }
    });
});

router.get("/food", function(req, res){
    Post.find({category: "Food"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Food"});
            }
        }
    });
});

router.get("/movie", function(req, res){
    Post.find({category: "Movie"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Movie"});
            }
        }
    });
});

router.get("/health", function(req, res){
    Post.find({category: "Health"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Health"});
            }
        }
    });
});

router.get("/technology", function(req, res){
    Post.find({category: "Technology"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Technology"});
            }
        }
    });
});

router.get("/others", function(req, res){
    Post.find({category: "Others"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            if(foundPosts.length <1){
                req.flash("error", "No posts yet.");
                res.redirect("back");
            } else{
                res.render("posts/index", {posts: foundPosts, page: "Others"});
            }
        }
    });
});

module.exports = router;