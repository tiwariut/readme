var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride       = require("method-override"),
    Post = require("./models/post"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    app = express();
    
var postsRoutes = require("./routes/posts"),
    commentsRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

//APP CONFIG
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/read_me", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

seedDB();

app.use(postsRoutes);
app.use(commentsRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});