const multer = require("multer");
const path = require("path");
const CustomError = require("../helpers/errors/CustomError");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const root = path.dirname(require.main.filename);
        cb(null, path.join(root, "/static/uploads"));
    },
    filename: function(req, file, cb) {
        //file- mimetypes  ---->  image/png , image/jpg ...
        let id = req.headers.id;
        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "image_" + id + "." + extension;

        cb(null, req.savedProfileImage);
    },
});


const fileFilter = (req, file, cb) => {
    allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return next(
            new CustomError("lütfen geçerli bir dosya türü giriniz", 400),
            false
        );
    }

    return cb(null, true);
};

const profileImageUpload = multer({ storage, fileFilter });

module.exports = profileImageUpload;