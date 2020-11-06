"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var user_1 = require("../models/user");
var user_2 = require("../models/user");
var bcrypt = require('bcrypt');
var saltRounds = 10;
var jwt = require('jsonwebtoken');
var router = express_1.Router();
router.post('/createUser/:name/:email/:password', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, checkExistUser, userData_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.params;
                    return [4 /*yield*/, user_2["default"].find({ "email": body.email })];
                case 1:
                    checkExistUser = _a.sent();
                    if (checkExistUser.length) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "User already exist" })];
                    }
                    userData_1 = new user_1["default"]({
                        name: body.name,
                        email: body.email,
                        password: body.password
                    });
                    bcrypt.hash(userData_1.password, saltRounds, function (err, hash) {
                        return __awaiter(this, void 0, void 0, function () {
                            var saveUser;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!err) return [3 /*break*/, 1];
                                        throw err;
                                    case 1:
                                        userData_1.password = hash;
                                        return [4 /*yield*/, userData_1.save()];
                                    case 2:
                                        saveUser = _a.sent();
                                        res
                                            .status(201)
                                            .json({ message: "User register successfully", user: saveUser });
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.post('/loginUser/:email/:password', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body_1, checkExistUser, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body_1 = req.params;
                    return [4 /*yield*/, user_2["default"].find({ "email": body_1.email })];
                case 1:
                    checkExistUser = _a.sent();
                    if (checkExistUser.length) {
                        bcrypt.compare(body_1.password, checkExistUser[0].password).then(function (hash) {
                            return __awaiter(this, void 0, void 0, function () {
                                var updateUser, token;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!!hash) return [3 /*break*/, 1];
                                            return [2 /*return*/, res
                                                    .status(400)
                                                    .json({ message: "User Not found" })];
                                        case 1: return [4 /*yield*/, user_2["default"].findOneAndUpdate({ "email": body_1.email }, { "email_verified": true }, { "new": true })];
                                        case 2:
                                            updateUser = _a.sent();
                                            token = jwt.sign({ updateUser: updateUser }, 'token');
                                            res
                                                .status(201)
                                                .json({ message: "User Login successfully", token: token, Info: updateUser });
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    }
                    else {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "User Not found" })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.post('/forgotPassword/:email', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, checkExistUser, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    body = req.params;
                    return [4 /*yield*/, user_2["default"].find({ "email": body.email })];
                case 1:
                    checkExistUser = _a.sent();
                    if (checkExistUser.length) {
                        res
                            .status(201)
                            .json({ message: "Your frogot password request acceptes please reset your password" });
                    }
                    else {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "User Not found" })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    throw error_3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.post('/resetPassword/:email/:password/:confirm_password', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body_2, checkExistUser, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (req.params.password !== req.params.confirm_password) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "Please fill the correct password" })];
                    }
                    body_2 = req.params;
                    return [4 /*yield*/, user_2["default"].find({ "email": body_2.email })];
                case 1:
                    checkExistUser = _a.sent();
                    if (checkExistUser.length) {
                        bcrypt.hash(body_2.password, saltRounds).then(function (hash) {
                            return __awaiter(this, void 0, void 0, function () {
                                var updateUser;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!!hash) return [3 /*break*/, 1];
                                            return [2 /*return*/, res
                                                    .status(400)
                                                    .json({ message: "User Not found" })];
                                        case 1: return [4 /*yield*/, user_2["default"].findOneAndUpdate({ "email": body_2.email }, { "password": hash }, { "new": true })];
                                        case 2:
                                            updateUser = _a.sent();
                                            res
                                                .status(201)
                                                .json({ message: "Password reset successfully", user: updateUser });
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    }
                    else {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "User Not found" })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    throw error_4;
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports["default"] = router;
