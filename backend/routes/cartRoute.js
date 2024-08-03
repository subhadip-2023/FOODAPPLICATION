import express from 'express';
import {addCart, getCart, removeCart} from "../controllers/cartController.js";
import authMiddleWare from '../middlewares/auth.js';


const cartRouter = express.Router();

cartRouter.post('/add',authMiddleWare, addCart);
cartRouter.get('/cartItems',authMiddleWare, getCart);
cartRouter.patch('/remove',authMiddleWare, removeCart);

export default cartRouter;
