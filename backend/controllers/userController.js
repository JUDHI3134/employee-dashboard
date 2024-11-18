import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}


const registerUser = async (req, res) =>{
    try {
        const {name, email, password} = req.body;

        const exist = await userModel.findOne({email})

        if (exist) {
            return res.json({success: false, message:"user already exist"})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"please enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success: false, message:"password must be 8 character"})
        }

        //hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        //save in database
        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success: true, token})



    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

//login
const loginUser = async (req, res) =>{
    try {
        const {email,password} = req.body

        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success: false, message:"user does not exist"}) 
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = createToken(user._id);
            return res.json({success: true, token})
        }else{
            return res.json({success: false, message:"Invalid password"})
        }

    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

//admin
const adminLogin = async (req, res) =>{
    try {
       const {email,password} = req.body
       if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email+password,process.env.JWT_SECRET)
        res.json({success: true,token})
       } else{
        res.json({success:false, message:"Invalid credentials.."})
       }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

export {registerUser, loginUser, adminLogin}