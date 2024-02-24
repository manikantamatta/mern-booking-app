import express, {Request, Response, Router} from 'express';
import  User  from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator'


const router = express.Router();

router.post("/register",

[
    check("email", "Email is required").isEmail(),
    check("password", "password with 6 or more characters is required").isLength({
        min:6
    })
 ],

async(req:Request, res:Response) => {
    const errors = validationResult(req.body)
     if(!errors.isEmpty()) return res.status(400).json({message:errors.array()}) 
 try {
        const {email, password} = req.body;

    let user = await User.findOne({email})
        
    if(user) return res.status(400).json({message:"User already exits"});

    user = new User(req.body);
    await user.save();
    const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET_KEY as string, {
        expiresIn:"1d"
    })
   
    res.cookie("auth-token", token, {
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:86400000

    });
    res.sendStatus(200);
 } catch (error) {
    console.log(error)
    res.status(500).send({message:"something went wrong"})
 }
});

export default router;