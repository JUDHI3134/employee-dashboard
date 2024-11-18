import mongoose from "mongoose";

const employeeSchemaa = new mongoose.Schema({
    empId:{type: Number, required: true},
    name:{type: String, required: true},
    email:{type: String, required: true},
    phone:{type: String, required: true},
    designation:{type: String, required: true},
    course:{type: String, required: true},
    gender:{type: String, required: true},
    image:{type: String, required: true},
    
},{timestamps: true})

const employeeModel = mongoose.models.employee || mongoose.model("employee",employeeSchemaa)

export default employeeModel;