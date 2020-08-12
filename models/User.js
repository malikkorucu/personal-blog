const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "lütfen geçerli bir email adresi giriniz",
        ],
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    password: {
        type: String,
        minlength: [6, "Şifre en az 6 karakter olmalıdır"],
    },
    createdAt: {
        type: Date,
        default: Date,
    },
    profile_image: {
        type: String,
        default: "default.jpg",
    },
    blocked: {
        type: Boolean,
        default: false,
    },
});

//Generating JWT
User.methods.generateJwtToken = function() {
    const { SECRET_KEY, EXPIRES_IN } = process.env;

    let payload = {
        id: this._id,
        name: this.name,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: EXPIRES_IN,
    });

    return token;
};

//Password hashing
User.pre("save", function(next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);

    this.password = hash
    next();
});

module.exports = mongoose.model("User", User);