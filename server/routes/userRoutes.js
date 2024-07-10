const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {

    try{

        const userExists = await User.findOne({email : req.body.email});

        if(userExists){
            success : false;
            return res.status(400).json({message : "User already exists"});
        }

        const salt = await bcrypt.genSalt(10); //adding 10 rounds of salt. 
        const hashedPassword = await bcrypt.hash(req.body.password, salt); //hashing the password
        req.body.password = hashedPassword; //setting the password to the hashed password

        const newUser = new User(req.body);
        await newUser.save(); 
        res.status(201).json(newUser);
    }
    catch(err){
        res.json(err);
    }
});

router.post("/login", async (req, res) => {

    const user = await User.findOne({email : req.body.email});

    if(!user){
            res.send({
            success : false,
            message : "User not found"
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword){
        res.send({
            success : false,
            message : "Invalid Password"
        })
    }
    else{
        res.send({
            success : true,
            message : "User logged in"
        })
    }
});


module.exports = router;