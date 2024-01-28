const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");

// register new user
router.post("/register",async(req,res)=>{
    try {
        const ExistingUser= await User.findOne({phone: req.body.phone});
        if(ExistingUser){
            return res.send({
                message:"user already exists",
                success:false,
                data:null
            })
        }
        const hashedpassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedpassword;
        const newuser = new User(req.body)
        await newuser.save();
        res.send(
            {
             message:"user created successsfully",
            success:true,
            data:null
        }
        );
    } catch (error) {
        res.send(
            {
             message:error.message,
            success:false,
            data:null
        }
        );
        
    }
});

// login user
router.post("/login",async(req,res)=>{
    try {
        const userExists = await User.findOne({phone:req.body.phone});
        if(!userExists){
            res.send({
                message:"user doesn`t exist",
                success:false,
                data:null,
            });
        }
        const passwordMatch = await bcrypt.compare(req.body.password,userExists.password);
        if(!passwordMatch){
            res.send({
                message:"incorrect password",
                success:false,
                data:null,
            });
        }
        // this is generate token to login, process.env.jwt_secret is secret key
        const token =jwt.sign({
           userId:userExists._id
        },
        process.env.jwt_secret,
        {expiresIn:"1d",});


        res.send({
            message:"user loggged successfully",
            success:true,
            data:token,
        });



    } catch (error) {
        res.send({
            message:error.message,
            success:false,
            data:null,
        });
    }
});

// get user by id
router.post("/get-user-by-id",authMiddleware,async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message:"user fetched successfully",
            success:true,
            data:user,
        })
    } catch (error) {
        res.send({
            message:error.message,
            success:false,
            data:null,
        })
    }
})

module.exports = router;