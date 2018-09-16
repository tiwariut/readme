var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: { type: String,  required: true }, 
    image: { type: String,  required: true }, 
    body: { type: String,  required: true }, 
    category: { type: String,  required: true }, 
    createdAt : { type: Date, default: Date.now },
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatar: String
    }
});

module.exports = mongoose.model("Post", postSchema);