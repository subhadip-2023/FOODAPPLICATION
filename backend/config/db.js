import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://TomatoApp:7001696@cluster0.iscuafx.mongodb.net/food-delivery-app')
    .then(()=>console.log('DB connection established'))
    .catch((error)=> console.log("DB connection failed due to Handshake_error",error))
}