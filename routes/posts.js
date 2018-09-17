var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    Post = require("../models/post");

//INDEX ROUTE
router.get("/", function(req, res) {
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Post.find({title: regex}, function(err, allPosts){
          if(err){
            console.log(err);
          } else{
              if(allPosts.length < 1){
                  req.flash("error", "No posts match that query, please try again.");
                  res.redirect("back");
              }
            res.render("posts/index", {posts: allPosts});
          }
        });
    } else{
        Post.find({}, function(err, allPosts){
          if(err){
            console.log(err);
          } else{
            res.render("posts/index", {posts: allPosts});
          }
        });
    }
});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("posts/new");
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    req.body.post.body = req.sanitize(req.body.post.body);
    Post.create(req.body.post, function(err, newPost){
        if(err){
            req.flash("error", "Not able to create your post.");
            res.redirect("back");
            console.log(err);
        } else{
            newPost.author.id = req.user._id;
            newPost.author.username = req.user.username;
            newPost.author.avatar = req.user.avatar;
            newPost.save();
            req.flash("success", "Added your post.");
            res.redirect("/posts/" + newPost.id);
        }
    });
});

//SHOW ROUTE
router.get("/:id", function(req, res) {
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            req.flash("error", "Post not found.");
            res.redirect("back");
            console.log(err);
        } else{
            res.render("posts/show", {post: foundPost});
        }
    });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkPostOwnership, function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            req.flash("error", "Post not found.");
            res.redirect("back");
            console.log(err);
        } else{
            res.render("posts/edit", {post: foundPost});
        }
    });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkPostOwnership, function(req, res){
    req.body.post.body = req.sanitize(req.body.post.body);
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            req.flash("error", "Post not found.");
            res.redirect("back");
            console.log(err);
        } else{
            req.flash("success", "Updated your post.");
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Post not found.");
            res.redirect("back");
            console.log(err);
        } else{
            req.flash("success", "Deleted your post.");
            res.redirect("/posts");
        }
    });
});

module.exports = router;

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}