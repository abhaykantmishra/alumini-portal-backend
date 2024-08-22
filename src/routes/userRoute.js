import { Router } from "express";
import { registerUser,loginUser,getUserById } from "../controllers/userController.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route("/getuser").post(getUserById);

export default userRouter;