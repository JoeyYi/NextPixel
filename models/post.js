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
    createdAt: { type: Date, default: Date.now },
    favorites: { type: Number, default: 0 }
});

module.exports = mongoose.model("Post", postSchema);