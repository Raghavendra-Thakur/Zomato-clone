import express from "express";
import passport from "passport";
import { ReviewModel } from "../../database/allModules";

const Router = express.Router()

/*
route : /:resId
decs  : get all reviews for  a restaurant
params : resId
access public
method get
*/

Router.get ("/:resId" ,async(req , res)=>{
    try {
        const {resId} = req.params;
        const reviews = await ReviewModel.find({restaurant : resId}).sort({
            createdAt: -1
        })
        return res.status(200).json({reviews})
    } catch (error) {
        return res.status(500).json({error: error.message})
        
    }
})


/*
route : /new
decs  : add new food/restaurant review and rating
params : none
access : private
method : post
*/

Router.post ("/new" , passport.authenticate("jwt" ,{session: false}),async(req , res)=>{
    try {
        const {_id} = req.user;
        const {reviewData} = req.body;
        const newReview = await ReviewModel.create({...reviewData , user: _id})
        return res.status(200).json({newReview})
    } catch (error) {
        return res.status(500).json({error: error.message})
        
    }
})


/*
route : /delete/:id
decs  : adelete review
params : none
access : private
method : DELETE

*/

Router.delete ("/delete/:id" , passport.authenticate("jwt" ,{session: false}),async(req , res)=>{
    try {
        const {user} = req;
        const {id} = req.params;
        const data = await ReviewModel.findOneAndDelete({
            _id : id,
            user : user._id
        })

        if(!data) return res.json({message : "review not deleted"})
        return res.status(200).json({message : "succesfully deleted review" , data})
    } catch (error) {
        return res.status(500).json({error: error.message})
        
    }
})


export default Router