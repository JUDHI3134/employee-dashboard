
import {v2 as cloudinary} from "cloudinary"
import employeeModel from "../models/employeeModel.js";
//add employee
const addEmployee = async (req,res) =>{
    try {
        const {empId,name, email, designation, gender, course, phone} = req.body;
        // let image_filename = `${req.file.filename}`
        const imageFile = req.file
        const imageUpload =  await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})

        const existEmail = await employeeModel.findOne({email})
        const existPhone = await employeeModel.findOne({phone})
        const existEmpId = await employeeModel.findOne({empId})

        if(existEmail){
            return res.json({success: false, message:"Employee already added"})
        }
        if(existPhone){
            return res.json({success: false, message:"Employee already added"})
        }
        if(existEmpId){
            return res.json({success: false, message:"Employee ID already Exist"})
        }
        
        const employeeData = {
            empId,
            name,
            email,
            phone,
            designation,
            course,
            gender,
            image:imageUpload.secure_url,
        }
        // console.log(employeeData);
    
        const employee = new employeeModel(employeeData)
        await employee.save();
        
        res.json({success: true, message:"Employee Added"})
    
    } catch (error) {
        console.log(error);
        res.json({success: false,message:error.message})
    }
    
    
}

//list employee
const listEmployee = async (req,res) =>{
   try {
    const employees = await employeeModel.find({})
    res.json({success: true, employees})
   } catch (error) {
    console.log(error);
    res.json({success: false,message:error.message})
   }
}

//get single employee
const singleEmployee = async (req,res) =>{
    try {
      const {employeeId} = req.body;
      const employee = await employeeModel.findById(employeeId)
      res.json({success: true, employee})
    } catch (error) {
        console.log(error);
    res.json({success: false,message:error.message}) 
    }
}

//delete employee
const deleteEmployee = async (req,res) =>{
    try {
       await employeeModel.findByIdAndDelete(req.body.id)
       res.json({success:true, message:"employee removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false,message:error.message})
    }
}


export {addEmployee,listEmployee,singleEmployee,deleteEmployee}