import express from "express";
import  MenuModel, { ImageModal } from "../../database/allModules";
const Router = express.Router();
import { ValidateId } from "../../validation/common.validation";
/*
 Route  : /list
 Desc   : get list of menu based on restaurant id
 params : _id
 Access : public
 Method : GET
*/

Router.post("/list/:_id" , async(req ,res)=>{
    try{const {_id} = req.params;
    await ValidateId(req.params)
    const menu = await MenuModel.findById(_id)

    if(!menu){
        return res.status(404).json({error: "No menu present for this restaurant"})
    }

    return res.status(200).json({menu})}
    catch(error){
        return res.status(500).json({error: error.message})
    }

})


/*
 Route  : /image
 Desc   : get list of menu based on restaurant id
 params : _id
 Access : public
 Method : GET
*/

Router.post("/image/:_id" , async(req ,res)=>{
   try{ const {_id} = req.params;
   await ValidateId(req.params)

    const menuImages = await ImageModal.findById(_id)

    if(!menuImages){
        return res.status(404).json({error: "No menu present for this restaurant"})
    }

    return res.status(200).json({menuImages})}
    catch(error){
        return res.status(500).json({error: error.message})
    }

})


export default Router
