import googleOAuth from "passport-google-oauth2"
import dotenv from "dotenv"

import { UserModel } from "../database/allModules"

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) =>{
    passport.use(
        new GoogleStrategy({
                clientID : process.env.GOOGLE_client_id,
                clientSecret : process.env.GOOGLE_client_secret,
                callbackURL: "http://localhost:4000/auth/google/callback"
            },
            async(accessToken , refreshToken , profile , done)=>{
                const newUser = {
                    fullname : profile.displayName,
                    email: profile.emails[0].value,
                    profilePic: profile.photos[0].value,
                }
                try {
                    const user = await UserModel.findOne({email:newUser.email})
                    if(user){
                    const token = user.generateJwtToken();
                    done(null , {user , token})
                }else{
                    const user = await UserModel.create(newUser);
                    const token = user.generateJwtToken();
                    done(null , {user , token})

                }
                } catch (error) {
                    done(error , null)
                }
            }
        )
    )
    passport.serializeUser((userData , done)=>done(null,{...userData}));
    passport.deserializeUser((id , done)=>done(null,id));
}