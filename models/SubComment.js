const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./Comment");

const SubComment = new Schema({
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
        ref: "BlogPost"
    },
    parentComment: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Comment",
    },
});

SubComment.pre("save", async function(next) {

    console.log(this);
    const comment = await Comment.findById(this.parentComment);
    comment.subComments.push(this._id);

    await comment.save();

    console.log(comment);
    return next();
});

module.exports = mongoose.model("SubComment", SubComment);