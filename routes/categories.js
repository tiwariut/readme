var express = require("express"),
    router = express.Router(),
    Post = require("../models/post");

router.get("/music", function(req, res){
    Post.find({category: "Music"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            res.render("posts/index", {posts: foundPosts});
        }
    });
});

router.get("/fashion", function(req, res){
    Post.find({category: "Fashion"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            res.render("posts/index", {posts: foundPosts});
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
            res.render("posts/index", {posts: foundPosts});
        }
    });
});

router.get("/beauty", function(req, res){
    Post.find({category: "Beauty"}, function(err, foundPosts){
        if(err){
            console.log(err);
            req.flash("No posts found");
            res.redirect("back");
        } else{
            res.render("posts/index", {posts: foundPosts});
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
            res.render("posts/index", {posts: foundPosts});
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
            res.render("posts/index", {posts: foundPosts});
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
            res.render("posts/index", {posts: foundPosts});
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
            res.render("posts/index", {posts: foundPosts});
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
            res.render("posts/index", {posts: foundPosts});
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
            res.render("posts/index", {posts: foundPosts});
        }
    });
});

module.exports = router;