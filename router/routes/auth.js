const express = require("express");
const router = express.Router();
const {
    signUpUser,
    signInUser,
    uploadImage,

} = require("../../controllers/C_auth");
const profileImageUpload = require("../../middlewares/profileImageUpload");

router.get("/", (req, res, next) => {
    res.send("auth route");
});

router.post("/register", signUpUser);
router.post("/upload", profileImageUpload.single("avatar"), uploadImage);
router.post("/login", signInUser);


module.exports = router;