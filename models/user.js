"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        "default": false
    }
}, { timestamps: true });
exports["default"] = mongoose_1.model("User", userSchema);
