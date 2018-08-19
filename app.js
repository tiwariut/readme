var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

//APP CONFIG
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/read_me", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));

//ROOT ROUTE
app.get("/", function(req, res) {
    res.redirect("/posts");
});

//INDEX ROUTE
app.get("/posts", function(req, res) {
    res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
});
