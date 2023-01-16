import express from "express";
import { ValidateCategory } from "../../validation/common.validation";
import FoodModel  from "../../database/allModules";
import { ValidateId } from "../../validation/common.validation";

const Router = express.Router();

/*
Route  : /:_id
desc   : get food based on id
params : _id
access : public
Method : GET
*/

Router.get('/:_id', async(req,res)=>{
    try {
        const {_id} = req.params;
        await ValidateId(req.params);
        const foods = await FoodModel.findById(_id)
        return res.status(200).json({foods})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
})

/*
Route  : /restaurant/:_id
desc   : get food based on restaurant id
params : _id
access : public
Method : GET
*/

Router.get('/r/:_id', async(req,res)=>{
    try {
        const {_id} = req.params
        const foods = await FoodModel.find({
            restaurant : _id
        })

        return res.status(200).json({foods})

    } catch (error) {
        return res.status(500).json({error : error.message})
    }
})

/*
Route  : /c/category
desc   : get food based on category
params : category
access : public
Method : GET
*/

Router.get('/c/:category', async(req,res)=>{
    try {
        
        const {category} = req.params
        await ValidateCategory(req.params)
        const foods = await FoodModel.find({
            category : {$regex : category, $options: "i"}
        })
        if(!foods){
            return res.status(404).json({error : 'no food matcht with ${category}'})
        }

        return res.status(200).json({foods})

    } catch (error) {
        return res.status(500).json({error : error.message})
    }
});



export default Router;