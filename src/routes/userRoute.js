import { Router } from "express";
import { registerUser,loginUser,getUserById,updateUserProfile } from "../controllers/userController.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route("/getuser").post(getUserById);
userRouter.route("/updateprofile").post(updateUserProfile);

export default userRouter;