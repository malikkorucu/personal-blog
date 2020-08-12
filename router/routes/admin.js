const express = require("express");
const router = express.Router();
const { addBlog, uploadImg } = require("../../controllers/C_admin");
const multer = require("multer");
const blogImageUpload = require("../../middlewares/blogImageUpload");

router.post("/uploadBlogImg", blogImageUpload.single("blog"), uploadImg);
router.post("/addBlog", addBlog)

module.exports = router;