var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();


app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/read_me", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running!");
});