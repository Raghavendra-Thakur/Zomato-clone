import express from 'express'
import passport from 'passport'
import { UserModel } from '../../database/allModules'
import { ValidateId } from '../../validation/common.validation'

const Router = express.Router()


/*
Route : /
Desc : GEt authorised user data
params npne
Access : private
Method : GET

*/

Router.get ("/" , passport.authenticate("jwt" ,{session:false}), async(req, res)=>{
    try {
        const {email , fullname, phoneNumber , address} = req.user
        return res.status(200).json({user :{email , fullname, phoneNumber , address}})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})


/*
Route : /:_id
Desc : GET authorised user data by id
params _id
Access : private
Method : GET

*/

Router.get ("/:_id" , async(req, res)=>{
    try {
        const {_id} = req.params
        await ValidateId(req.params)

        const getuser = await UserModel.findById(_id) 
        const {fullname} = getuser

        if(!getuser){
            return res.status(404).json({error : "USer Not found"})
        }
  
        return res.status(200).json({user:{fullname}})


    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})


/*
Route : /:_id
Desc : UPDATE authorised user data by id
params _id
Access : private
Method : PUT

*/

Router.get ("/update/:_id" , passport.authenticate("jwt" ,{session:false}), async(req, res)=>{
    try {
        const {_id} = req.params
        const {userData} = req.body;

        userData.password = undefined
        const updateUserData = await UserModel.findById(_id,{
            $set :userData,
        },{
            new:true
        }); 
        return res.status(200).json({user:{updateUserData}})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})



export default Router;