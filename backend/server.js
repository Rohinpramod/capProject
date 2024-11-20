import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import { apiRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";



config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('Test Successfull');
});

app.use('/api',apiRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> 
    console.log(`Server running on port ${PORT}`)
); 

app.all("*",(req,res)=>{
    res.status(404).json({message:'end point not exist'})
})