var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: "String",
    image: "String",
    body: "String",
    created: {type: Date, default: Date.now},
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Post", postSchema);