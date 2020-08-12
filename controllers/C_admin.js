const asyncHandler = require('express-async-handler')
const BlogPost = require('../models/BlogPost')

const addBlog = asyncHandler(async(req, res, next) => {
    const { title, text, blog_img } = req.body

    const blog = await BlogPost.create({
        title,
        text,
        blog_img
    })

    res.status(200).json({
        success: true,
        message: "Blog eklendi",
        data: blog
    })

})

const uploadImg = (req, res, next) => {
    res.json({
        success: true,
        message: "Blog fotoğrafı güncellendi ..."
    })
}

module.exports = {
    addBlog,
    uploadImg
}