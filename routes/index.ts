import { Router } from "express"
import { User } from "../types/user"
import UserModel from "../models/user"
import user from "../models/user"
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const router: Router = Router()

router.post('/createUser/:name/:email/:password', async function (req, res) {
    try {
        const body = req.params as Pick<User, "name" | "email" | "password">
        const checkExistUser: User[] = await user.find({ "email": body.email })
        if (checkExistUser.length) {
            return res
                .status(400)
                .json({ message: "User already exist" })
        }
        const userData: User = new UserModel({
            name: body.name,
            email: body.email,
            password: body.password,
        })
        bcrypt.hash(userData.password, saltRounds, async function (err, hash) {
            if (err) {
                throw err
            } else {
                userData.password = hash
                const saveUser: User = await userData.save()
                res
                    .status(201)
                    .json({ message: "User register successfully", user: saveUser })
            }
        });
    } catch (error) {
        throw error
    }
});


router.post('/loginUser/:email/:password', async function (req, res) {
    try {
        const body = req.params as Pick<User, "email" | "password">
        const checkExistUser: User[] = await user.find({ "email": body.email })
        if (checkExistUser.length) {
            bcrypt.compare(body.password, checkExistUser[0].password).then(async function (hash) {
                if (!hash) {
                    return res
                        .status(400)
                        .json({ message: "User Not found" })
                } else {
                    const updateUser: User = await user.findOneAndUpdate({ "email": body.email }, { "email_verified": true }, { new: true })
                    var token = jwt.sign({ updateUser }, 'token');
                    res
                        .status(201)
                        .json({ message: "User Login successfully", token: token, Info: updateUser })
                }
            })
        } else {
            return res
                .status(400)
                .json({ message: "User Not found" })
        }

    } catch (error) {
        throw error
    }
});

router.post('/forgotPassword/:email', async function (req, res) {
    try {
        const body = req.params as Pick<User, "email" | "password">
        const checkExistUser: User[] = await user.find({ "email": body.email })
        if (checkExistUser.length) {
            res
                .status(201)
                .json({ message: "Your frogot password request acceptes please reset your password" })
        } else {
            return res
                .status(400)
                .json({ message: "User Not found" })
        }

    } catch (error) {
        throw error
    }
});

router.post('/resetPassword/:email/:password/:confirm_password', async function (req, res) {
    try {
        if (req.params.password !== req.params.confirm_password) {
            return res
                .status(400)
                .json({ message: "Please fill the correct password" })
        }
        const body = req.params as Pick<User, "email" | "password">
        const checkExistUser: User[] = await user.find({ "email": body.email })
        if (checkExistUser.length) {
            bcrypt.hash(body.password, saltRounds).then(async function (hash) {
                if (!hash) {
                    return res
                        .status(400)
                        .json({ message: "User Not found" })
                } else {
                    const updateUser: User = await user.findOneAndUpdate({ "email": body.email }, { "password": hash }, { new: true })
                    res
                        .status(201)
                        .json({ message: "Password reset successfully", user: updateUser })
                }
            })
        } else {
            return res
                .status(400)
                .json({ message: "User Not found" })
        }

    } catch (error) {
        throw error
    }
});

export default router