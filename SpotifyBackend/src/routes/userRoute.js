import express from 'express';
import upload from "../middleware/multer.js";
import { addUser,listUser,removeUser,loginUser } from '../controllers/userController.js';


const userRouter = express.Router();

userRouter.post('/add',addUser);
userRouter.get('/list',listUser);
userRouter.post('/remove',removeUser);
userRouter.post('/login', loginUser);
export default userRouter;