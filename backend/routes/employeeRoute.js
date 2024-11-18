import express from "express"
import { addEmployee, deleteEmployee, listEmployee, singleEmployee } from "../controllers/employeeController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const employeeRouter = express.Router();

employeeRouter.post("/add",adminAuth,upload.single('image'),addEmployee)
employeeRouter.post("/remove",adminAuth,deleteEmployee)
employeeRouter.post("/single",singleEmployee)
employeeRouter.get("/list",listEmployee)

export default employeeRouter;