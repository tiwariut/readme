//ROOT ROUTE
app.get("/", function(req, res) {
    res.redirect("/posts");
});

//REGISTER ROUTES

app.get("/register", function(req,res){
    res.render("register", {page: "register"});
});

app.post("/register", function(req, res) {
    var newUser = new User(
        {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            avatar : req.body.avatar,
            email: req.body.email
        });
    if(req.body.adminCode === "justdoit"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to ReadMe " + user.username + "!");
            res.redirect("/posts");
        });
    });
});

//LOGIN ROUTES

app.get("/login", function(req, res) {
    res.render("login", {page: "login"});
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}), function(req, res){});


//LOGOUT ROUTE
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/posts");
});
