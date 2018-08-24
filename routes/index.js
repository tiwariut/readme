var express = require("express"),
    router = express.Router();

//ROOT ROUTE
router.get("/", function(req, res) {
    res.redirect("/posts");
});

module.exports = router;