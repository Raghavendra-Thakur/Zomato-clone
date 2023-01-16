import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        food:{
            type: mongoose.Types.ObjectId,
            ref: "foods"
        },
        restaurant:{
            type: mongoose.Types.ObjectId,
            ref: "restaurants",
        },
        ratings:{
            type: Number,
            required: true
        },
        reviewText:{
            type:String,
            required:true
        },
        isRestaurant:Boolean,
        isfoods:Boolean,
        photos:{
            type:mongoose.Types.ObjectId,
            ref:"images"
        }
        

    },
    {
        timestamps: true
    }
)

export const ReviewModel = mongoose.model("reviews" , ReviewSchema)