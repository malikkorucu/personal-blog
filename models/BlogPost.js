const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date
    },
    blog_img: {
        type: String,
        default: "blog_default.jpg"
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model("BlogPost", BlogPost);