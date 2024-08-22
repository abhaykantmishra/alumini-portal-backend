import Post from "../models/postModel.js";
import { uploadImageOnCloudinary } from "../services/cloudinary.js";
import User from "../models/userModel.js"

async function postJob(req,res){
    try {
        console.log("body:",req.body);
        const {userEmail,title,postedBy,postedByName,description,url} = req.body;
        if(!userEmail || !title || !postedBy || !postedByName || !description){
            return res.status(400).json({
                message:"all above fields are required!"
            })
        }
        if(!(userEmail?.trim()) || !(title?.trim()) || !(postedBy?.trim()) || !(description?.trim()) || !(postedByName?.trim())){
            return res.status(400).json({
                message:"all fields are required!"
            })
        }

        const usr = await User.findById(postedBy);
        if(!usr){
            return res.status(404).json({
                msg:"no such user exist with given userId"
            })
        }



        const file = req.file;

        // uploading on cloudinary =>

        let thumbnailInfo = {}
        if(file){
            const filePath = file.path;
            if(!filePath){
                return res.status(500).json({
                    msg:"Something went wrong while uploading image file"
                })
            }
            const cloudinaryResponse = await uploadImageOnCloudinary(filePath);
            if(!filePath){
                return res.status(500).json({
                    msg:"Something went wrong while uploading on Clodinary"
                })
            }
            thumbnailInfo = {
                ...thumbnailInfo,
                fileUrl:cloudinaryResponse.secure_url,
                asset_id:cloudinaryResponse.asset_id,
                public_id:cloudinaryResponse.public_id,
                api_key:cloudinaryResponse.api_key,
            }
        }

        // creating new post =>
        const createdPost = await Post.create({
            postedBy:postedBy?.trim(),
            postedByName:postedByName?.trim(),
            userEmail:userEmail?.trim(),
            description : description?.trim(),
            title:title?.trim(),
            url:url?.trim(),
            thumbnail:thumbnailInfo?.fileUrl,
            thumbnailInfo:thumbnailInfo,
        })

        if(!createdPost){
            return res.status(500).json({
                msg:"Something went wrong while creating a post"
            })
        }

        return res.status(201).json({
            msg:"post created successfully",
            post:createdPost,
        })


    } catch (error) {
        console.log(`uploading error : ${error}`);
        return res.status(500).json({
            msg:"Something went wrong",
            error:error
        })
    }
}

async function getJobs(req,res){
    try {
        const allJobs = await Post.find({});
        console.log(allJobs);
        if(!allJobs){
            return res.status(500).json({
                msg:"something went wrong while fetching jobs!"
            })
        }

        return res.status(200).json({
            msg:"get all recent jobs",
            jobs:allJobs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"something went wrong while fetching jobs!"
        })
    }
}

export {
    postJob,
    getJobs
}