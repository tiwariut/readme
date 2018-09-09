var express = require("express"),
    router = express.Router(),
    Post = require("../models/post"),
    User = require("../models/user");

//USER PROFILE ROUTE
router.get("/:id", function(req, res) {
   User.findById(req.params.id, function(err, foundUser){
       if(err){
           req.flash("error", "User not found.");
           res.redirect("back");
           console.log(err);
       } else{
           Post.find().where("author.id").equals(foundUser._id).exec(function(err, posts){
               if(err){
                   req.flash("error", "Posts not found.");
                   res.redirect("back");
                   console.log(err);
               } else{
                   res.render("users/show", {user: foundUser, posts: posts});
               }
           });
       }
   }); 
});

module.exports = router;
