const express=require("express")
const router=express.Router()
const JWT=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const Auth = require("../models/auth")
const Admin = require("../models/admin")
const User = require("../models/user")
require('dotenv').config();
const jwt_secret=process.env.JWT_SECRET


// signup routes
router.post("/signup",async(req,res)=>{
    try {
        const {name,email,password,role}=req.body
        if (!name || !email || !password || !role) {
            return res.status(400).json({message:"Please fill all the fields",success: false})
        }
        const authuser=await Auth.findOne({email})
        if (authuser){
            return res.status(400).json({message:"User already exists",success: false})
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const auth= await Auth.create({
            name,email,password: hashedPassword,role
        })
        if (role == "admin"){
            const admin= await Admin.create({
                name: auth.name,
                email: auth.email,
                password: auth.password,
            })
            const payload={
                user:{
                    _id: admin._id,
                    name: admin.name,
                    role: "admin"
                }
            }
            const token=JWT.sign(payload,jwt_secret)
            return res.status(200).json({success: true,admin,token})
        }
        if (role == "user"){
            const user= await User.create({
                name: auth.name,
                email: auth.email,
                password: auth.password,
            })
            const payload={
                user:{
                    _id: user._id,
                    name: user.name,
                    role: "user"
                }
            }
            const token=JWT.sign(payload,jwt_secret)
            return res.status(200).json({success: true,user,token})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,message: "Some internal issue is there"})
    }
})


// login routes
router.post("/login",async(req,res)=>{
    try {
        const {email,password,role}=req.body
        if (!email || !password || !role) {
            return res.status(400).json({message:"Please fill all the fields",success: false})
        }
        const authuser=await Auth.findOne({email})
        
        if (!authuser){
            return res.status(400).json({message:"No User exists",success: false})
        }
        if (authuser.role !== role) {
            return res.status(400).json({ message: "Role mismatch", success: false });
        }
        const isMatch=await bcrypt.compare(password,authuser.password)
        if(!isMatch){
            return res.json({message: "Invalid Credentials",success: false})
        }
        if (role == "admin"){
            const adminuser=await Admin.findOne({email})
            const payload={
                user:{
                    _id: adminuser._id,
                    name: adminuser.name,
                    role: "admin"
                }
            }
            const token=JWT.sign(payload,jwt_secret)
            return res.status(200).json({success: true,token})
        }
        if (role == "user"){
            const user=await User.findOne({email})
            const payload={
                user:{
                    _id: user._id,
                    name: user.name,
                    role: "user"
                }
            }
            const token=JWT.sign(payload,jwt_secret)
            return res.status(200).json({success: true,token})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,message: "Some internal issue is there"})
    }
})


module.exports=router
