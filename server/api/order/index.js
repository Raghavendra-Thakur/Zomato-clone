import express from "express";
import passport from "passport";
import { OrderModel } from "../../database/allModules";
const Router = express.Router()

/*
route  : /
desc   : Get all orders by user id
params : none
access : private
method : GET
*/

Router.get("/", passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {user} = req;
        const getOrder = await OrderModel.findOne({user:user._id});
        if(!getOrder){
          return  res.status(404).json({error: 'no order found '})

        }
        return res.status(200).json({orders :getOrder})
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }

} )



/*
route  : /new
desc   : add new Order
params :  none
access : private
method : PUT
*/

Router.put("/new", passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        const {user} = req;
        const {orderDetails} = req.body;
        const addOrder = await OrderModel.findByIdAndUpdate({
            user : user._id,

        },{
            $push:{orderDetails:orderDetails}
        },{
            new :true
        })
        if(!orderDetails){
            res.status(404).json({error: 'no order found '})

        }
        return res.status(200).json({order :addOrder})
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }

} )

export default Router