import jwt from "jsonwebtoken";
// import User from "../model/user.js";

export const requireSignIn = async(req,res,next) =>{
    try {
        try {
            const token =  req.header('Authorization')
                const decode =   jwt.verify(token,"ritik123");
                req.user = decode;
                console.log(req.user,token,"hii")
                next();
           } catch (error) {
            console.log(error.message);
            res.status(404).json({
                message:error.message,
            })
           }
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
}