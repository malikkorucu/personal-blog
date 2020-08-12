const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogPost = require("../models/BlogPost");

const Comment = new Schema({
    createdAt: {
        type: Date,
        default: Date,
    },
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    blog: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "BlogPost",
    },
    subComments: [{
        type: mongoose.Schema.ObjectId,
        ref: "SubComment",
    }, ],
});

Comment.pre("save", async function(next) {
    const blog = await BlogPost.findById(this.blog);

    if (!blog.comments.includes(this._id)) {
        blog.comments.push(this._id);
    }

    await blog.save();
    next();
});

module.exports = mongoose.model("Comment", Comment);