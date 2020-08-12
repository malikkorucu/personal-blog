const express = require("express");
const router = express.Router();
const {
    getAllBlogs,
    updateBlog,
    deleteBlog,
    getSingleBlog,
    addComment,
    answerComment,
} = require("../../controllers/C_blog");

router.get("/getAllBlogs", getAllBlogs);
router.post("/updateBlog/:id", updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);
router.get("/singleBlog/:id", getSingleBlog);
router.post("/addComment/:id", addComment);
router.post("/answerComment/:id", answerComment);

module.exports = router;