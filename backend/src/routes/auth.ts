import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator'
import User, { UserType } from '../models/user';

router.post('/login',
    [
        check("email", "Email is required").isEmail(),
        check("password", "password with 6 or more characters is required").isLength({
            min: 6
        })
    ],
    async (req: Request, res: Response) => {

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() })

        try {
            const { email, password } = req.body;
            let user:any = await User.findOne({ email });
            if (!user) res.status(400).send({ message: "Inavlid credentials" });
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).send({ message: "Inavlid credentials" });
            const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET_KEY as string, {
                expiresIn:"1d"
            })
           
            res.cookie("auth-token", token, {
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                maxAge:86400000
        
            });
            res.status(200).send({userId:user._id});
        } catch (error) {
            res.status(400).json({ message: "something went wrong" })
        }
    })


export default router