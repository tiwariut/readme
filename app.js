var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    session = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash = require("connect-flash"),
    Post = require("./models/post"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    middleware = require("./middleware"),
    app = express();

//REQUIRING ROUTES

var indexRoutes = require("./routes/index"),
    userRoutes = require("./routes/users"),
    postRoutes = require("./routes/posts"),
    commentRoutes = require("./routes/comments");
    

//APP CONFIG
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/read_me", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment")

//PASSPORT CONFIG
app.use(session({
    secret : "Just do it!",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

//seedDB();

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/posts/:id/comments", commentRoutes);

//STARTING SERVER
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running!");
    console.log(process.env.GMAILPW);
});
