import { Router } from "express";
import { getJobs, postJob } from "../controllers/postController.js";
import {upload} from "../middleware/multer.middleware.js";

const postRouter = Router();

postRouter.route('/postjob').post(upload.single('thumbnail'),postJob);
postRouter.route("/getjobs").get(getJobs);

export default postRouter;