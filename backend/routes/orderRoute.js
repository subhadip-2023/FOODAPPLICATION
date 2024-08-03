import express from "express"
// import orderModel from "../Schema/orderModel.js";
import { placeOrder, userOrders, verifyOrder, listAllOrders, orderStatus } from "../controllers/orderController.js";
import authMiddleWare from "../middlewares/auth.js";


const orderRouter = express.Router();

orderRouter.post('/place',authMiddleWare, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.get('/myOrders', authMiddleWare, userOrders);
orderRouter.get('/allOrders', listAllOrders);
orderRouter.post('/status', orderStatus);

export default orderRouter;