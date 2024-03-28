const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {UserModel} = require("../models/User.model");
require("dotenv").config();

const userController = Router();

userController.post("/signup", (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err) {
            res.json({message:"Something Went wrong, Please Try after sometime"});
        }
        const user = new UserModel({name, email, password : hash});
        await user.save();
        res.json({message: "Signup sucessfull"});
    });
})

userController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    const hash = user.password;
    bcrypt.compare(password, hash, function(err, result) {
        if(err) {
            res.json({message :"Something went wrong. Try again later!"});
        }
        if(result) {
            const token = jwt.sign({ userId : user._id }, process.env.JSON_KEY);
            res.send({message : "Login Sucessful", token});
        }
        else {
            res.json({message:"Invalid Credentials!"});
        }
    });
})

module.exports = {userController};