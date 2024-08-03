// Importing all npm packages

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';


// App configuration and port setting for creating routes
const app = express();
const PORT = 8000;

// Middlewares for parsing JSON and front-end backend Integration
app.use(express.json());
app.use(cors());

// DB connection MONGODB
connectDB()

// api endpoints
app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter)


// for testing req-res with browser
app.get('/',(req,res)=>{
    res.send('API is working');
});

// Creating server and listening on port 8000
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
});