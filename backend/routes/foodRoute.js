// Creating API for Sharing Data between frontend and backend

import express from 'express';
import multer from 'multer'; // for saving images in memory
import {addFood, getFoodList, removeFood} from '../controllers/foodController.js';

const foodRouter = express.Router();
// Image Storage Engine
const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);
    }
});

// Uploading files in the server
const upload = multer({storage:storage});

// api endpoints
foodRouter.post('/add', upload.single("image"),addFood);
foodRouter.get('/list',getFoodList);
foodRouter.delete('/remove',removeFood);


export default foodRouter;