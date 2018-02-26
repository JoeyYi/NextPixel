var mongoose = require("mongoose");


var postSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);