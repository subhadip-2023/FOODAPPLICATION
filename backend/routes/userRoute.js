import express from 'express';

import { userLogin, registerUser } from "../controllers/userController.js";

const userRouter = express();

userRouter.post('/register', registerUser);
userRouter.post('/login', userLogin);

export default userRouter;