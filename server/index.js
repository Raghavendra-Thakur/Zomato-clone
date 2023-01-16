import express from "express";
import dotenv from "dotenv"
import passport from "passport";
import session from "express-session";

import PrivateRoute from "./config/route.config"
import googleAuthConfig from "./config/google.config"
//Data base connection
import connectionDB from "./database/connection";

//API
import Auth from './api/auth'
import Food from './api/food'
import Restaurant from './api/restaurant'
import User from './api/user'
import Menu from './api/menu'
import Order from './api/order'
import Review from './api/review'

dotenv.config();

const zomato = express();
PrivateRoute(passport);
googleAuthConfig(passport);
zomato.use(express.json())
zomato.use(passport.initialize())
zomato.use(session({secret: "devtown"}))
zomato.use(passport.session())
zomato.get("/",(req,res)=>{
    res.json({
        message: 'server running'

    });
});

// /auth/singup

zomato.use("/auth" , Auth)
zomato.use("/food" , Food)
zomato.use("/restaurant" , Restaurant)
zomato.use("/user" ,User)
zomato.use("/menu" ,Menu)
zomato.use("/order", Order)
zomato.use("/review", Review)



const PORT = 4000 ; 

zomato.listen(PORT,()=>{
    connectionDB()
    .then(()=>{
        console.log("server is running")
    })
    .catch((error)=>{
        console.log("server run but connection failed");
        console.log(error);
    })
    // console.log("server is running")
});




