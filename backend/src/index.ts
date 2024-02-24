import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import UserRoutes from './routes/user';
import authRoutes from './routes/auth'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
        .then(() => console.log("connected to mongodb"))
        .catch((err) => {
         console.log(`could not connect to mongodb`, err)
        })

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api/users",  UserRoutes)
app.use("/api/auth",  authRoutes)

app.listen(7000, () => {
    console.log("server is running on localhost:7000")
})