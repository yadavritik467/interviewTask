// importing packages
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';


// importing routes
import userRouter from './routes/user.js'
import profileRouter from './routes/profile.js'


// ---------------------------------------


const app = express();

const port = 4500;


// connecting database

const mongoDB = async() =>{
    try {
        await mongoose.connect("mongodb+srv://yadavritik467:ritik23121999@cluster0.psqunil.mongodb.net/todo",{useNewUrlParser:true,useUnifiedTopology:true});

        console.log("db connected")
    } catch (error) {
        console.log("db not connected",error)
    }
}

mongoDB();

// ---------------------------------->  middlewares

app.use(express.json());
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cors({
    origin: 'http://localhost:3000', // Update this to match your frontend's origin
    credentials: true,
  }));
app.use(cookieParser());


//-----------------------------------> All routes
app.use("/api/v1",userRouter)
app.use("/api/v1",profileRouter)




app.get('/',(req,res)=>{
    res.send("working");
});


app.listen(port,()=>{
    console.log(`listening on ${port}`);
});