const asyncHandler = require("express-async-handler");
const BlogPost = require("../models/BlogPost");
const CustomError = require("../helpers/errors/CustomError");
const Comment = require("../models/Comment");
const SubComment = require("../models/SubComment");

const getAllBlogs = asyncHandler(async(req, res, next) => {
    const blogPosts = await BlogPost.find({});

    if (!blogPosts) {
        return next(new CustomError("hiç blog bulunamadı"));
    }

    res.status(200).json({
        success: true,
        message: "başarılı",
        data: blogPosts,
    });
});

const updateBlog = asyncHandler(async(req, res, next) => {
    const id = req.params.id;
    const { blog_img, title, text } = req.body;

    const blog = await BlogPost.findByIdAndUpdate(
        id, {
            blog_img: blog_img,
            text: text,
            title: title,
        }, {
            new: true,
        }
    );

    res.status(200).json({
        success: true,
        message: "Blog içeriği güncellendi",
        data: blog,
    });
});

const getSingleBlog = asyncHandler(async(req, res, next) => {
    let id = req.params.id;

    const blog = await BlogPost.findById(id)
        .populate({
            path: "comments",
            populate: { path: "user" },
        })
        .populate({
            path: "comments",
            populate: {
                path: "subComments",
                populate: {
                    path: "user",
                },
            },
        });

    res.status(200).json({
        success: true,
        message: "başarılı",
        data: blog,
    });
});

const deleteBlog = asyncHandler(async(req, res, next) => {
    const id = req.params.id;

    let blog = await BlogPost.deleteOne({ _id: id });

    res.status(200).json({
        success: true,
        data: blog,
    });
});

const addComment = asyncHandler(async(req, res, next) => {
    const blogId = req.params.id;
    const { userId, commentText } = req.body;

    const comment = await Comment.create({
        text: commentText,
        user: userId,
        blog: blogId,
    });

    res.status(200).json({
        success: true,
        data: comment,
    });
});

const answerComment = asyncHandler(async(req, res, next) => {
    const { commentText, userId, parentId, blogId } = req.body;

    console.log(req.body);
    const subComment = await SubComment.create({
        text: commentText,
        user: userId,
        parentComment: parentId,
        blog: blogId
    });

    res.status(200).json({
        success: true,
        data: subComment,
    });
});

module.exports = {
    getAllBlogs,
    updateBlog,
    deleteBlog,
    getSingleBlog,
    addComment,
    answerComment,
};