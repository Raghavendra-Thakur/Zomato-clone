
import JwtPassport from "passport-jwt"
import { UserModel } from "../database/allModules";

const JWTStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

//Authorization : "Bearer sometokenString"

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "devtown"


}

export default (passport) =>{
    passport.use(
        new JWTStrategy(options , async(jwtpayload, done)=>{
            try {
                const doesUserExist = await UserModel.findById(jwtpayload.user)
                if(!doesUserExist) return (null , false)
                return done(null, doesUserExist)
            } catch (error) {
                throw new Error(error);
            }
        })
    )
}

