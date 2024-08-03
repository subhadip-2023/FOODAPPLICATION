// (C R U D) CONTROLLING FRONTEND - BACKEND DATA EXCHANGE

import foodModel from "../Schema/foodModel.js";
import fs from 'fs';

// Create Food Item
const addFood = async(req,res) => {
    let image_Filename = `${req.file.filename}`; // PARSING IMAGE OF PRODUCT

    // SAVING PRODUCT AND DESCRIPTION
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_Filename,
    })
    try {
        await food.save(); // DATA SAVED IN DATABASE
        res.json({success:true, message:"Food Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// Read All Food Items Form database
const getFoodList = async(req,res) =>{
    try {
        const Items = await foodModel.find({});
        res.json({sucess:true, data:Items});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// Delete Food Item by ID
const removeFood = async(req,res) =>{
    let foodId = req.body.id;
    // console.log(foodId);
    try {
        const foodItem = await foodModel.findByIdAndDelete(foodId);
        fs.unlink(`uploads/${foodItem.image}`,()=>{});
        res.json({success:true, data:foodItem});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {addFood,getFoodList,removeFood};