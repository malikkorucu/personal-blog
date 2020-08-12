const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const root = path.dirname(require.main.filename);
        cb(null, path.join(root, "/static/uploads/blogImages"));
    },
    filename: function(req, file, cb) {
        //file- mimetypes  ---->  image/png , image/jpg ...
        const extension = file.mimetype.split("/")[1];
        req.savedBlogImage = "blog_" + file.originalname;
        req.filename = file.originalname
        cb(null, req.savedBlogImage);
    },
});

const blogImageUpload = multer({ storage });

module.exports = blogImageUpload;