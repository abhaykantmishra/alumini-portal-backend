import mongoose,{Schema} from "mongoose";

const postSchema = new Schema(
    {
        userEmail:{
            type:String,
            required:true,
        },
        postedBy:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true,
        },
        postedByName:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
        },
        url:{
            type:String,
        },
        thumbnail:{
            type:String // cloudinary url
        },
        thumbnailInfo:{
            type:Object,
        },
        batchName:{
            type:String,
        }
    },
    {
        timestamps:true
    }
)

const Post = mongoose.model("Post",postSchema);

export default Post