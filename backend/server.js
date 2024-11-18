import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import employeeRouter from "./routes/employeeRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary()


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Api Working..")
})


app.use("/api/user",userRouter);
app.use("/api/employee",employeeRouter)

app.listen(port,()=>{
    console.log(`server run port ${port}`);
    
})