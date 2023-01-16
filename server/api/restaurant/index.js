import express  from "express";
import { RestModal } from "../../database/allModules";
import { ValidateCity, ValidateId, ValidateSearch } from "../../validation/common.validation";
const Router = express.Router()

/*
route : /
desc  : get all details of restaurant based on the city
params none
access public
Method GET

*/

Router.get("/" , async(req , res)=>{
    try {
        const {city} = req.query 
        await ValidateCity(req.params)

        const restaurant = await RestModal.find({city})
        if(restaurant.length === 0 ){
            return res.json({error : " no restaurant found in this city"})
        }

        return res.status(200).json({restaurant})

    } catch (error) {
        return res.status(500).json({error : error.message})
    }
})

/*
route : /:_id
desc  : get all details of restaurant based on id
params _id
access public
Method GET

*/

Router.get("/:_id" , async(req , res)=>{
    try {
       const {_id} = req.params;
    await ValidateId(req.params)

        const restaurant = await RestModal.findById(_id)

        if(!restaurant){
            return res.json({error : " no restaurant found"})
        }

        return res.status(200).json({restaurant})
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
});


/*
route : /search/searchString
desc  : get all details of restaurant based on search string
params none
access public
Method GET

*/

Router.get("/search/:searchString" , async(req , res)=>{
    try {
       // searchString : "hotel rana"
       /*
       result :
       RANA
       hotel JAYRANA
       rana

       */

       const {searchString} = req.params;
       await ValidateSearch(req.params)
       const restaurant = await RestModal.find({
        name:{$regex : searchString , $options : "i"}
       })
       if (!restaurant.length === 0) {
        return res
          .status(404)
          .json({ error: `No restaurant matched with ${searchString}` });
      }
      return res.status(200).json({restaurant})

        
    } catch (error) {
        return res.status(500).json({error : error.message})
    }
})

export default Router;