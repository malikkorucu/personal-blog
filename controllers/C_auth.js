const asyncHandler = require("express-async-handler");
const CustomError = require("../helpers/errors/CustomError");
const { comparePasswords, sendTokenToClient } = require("../helpers/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signUpUser = asyncHandler(async(req, res, next) => {
    const { name, username, password, repeatPassword, email } = req.body;

    if (!comparePasswords(password, repeatPassword)) {
        return next(new CustomError("parolalar eşleşmiyor", 400));
    }

    const user = await User.create({
        name,
        email,
        username,
        password,
    });

    res.status(200).json({
        success: true,
        message: "Kullanıcı kayıt işlemi başarılı...",
        data: user,
    });
});

const signInUser = asyncHandler(async(req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
        return next(
            new CustomError("Kullanıcı bulunamadı, lütfen tekrar deneyiniz", 400)
        );
    }

    if (!comparePassword(password, user.password)) {
        return next(new CustomError("parolalar eşleşmiyor...", 400));
    }

    res.status(200).json({
        success: true,
        message: `Hoşgeldin ${user.name}`,
        data: {
            user,
            ...sendTokenToClient(user),
        },
    });
});

const comparePassword = (passUser, passDb) => {
    return bcrypt.compareSync(passUser, passDb);
};

const uploadImage = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.headers.id, {
            profile_image: req.savedProfileImage,
        }, {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        message: "yüklendi",
        data: user,
    });
});

module.exports = {
    signUpUser,
    signInUser,
    uploadImage,
};