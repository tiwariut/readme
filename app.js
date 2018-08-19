var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Post = require("./models/post"),
    seedDB = require("./seeds"),
    app = express();

//APP CONFIG
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/read_me", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

seedDB();

//ROOT ROUTE
app.get("/", function(req, res) {
    res.redirect("/posts");
});

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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});
