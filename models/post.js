var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: "String",
    image: "String",
    created: {type: Date, default: Date.now},
    body: "String"
});

module.exports = mongoose.model("Post", postSchema);