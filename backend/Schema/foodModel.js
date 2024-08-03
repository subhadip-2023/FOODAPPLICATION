// Creating Schema for PRODUCT

import mongoose from "mongoose";

// Defining the schema for the product data.
const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
})

// Checking whether Schema is available or create new Schema
const foodModel = mongoose.models.food || mongoose.model('food', foodSchema);

export default foodModel;