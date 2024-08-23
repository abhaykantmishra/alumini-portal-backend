import User from "../models/userModel.js";

async function registerUser(req,res){
    try {
        const {name, email , password, collegeName } = req.body;
        if(!(name.trim()) || !(collegeName.trim()) || !(email.trim()) || !(password.trim())  ){
            return res.status(400).json({msg:"all fields are required!"})
        }
        
        // check for existed user =>
        const existedUser = await User.findOne({
            $or: [{ email }]
        })
        if(existedUser){
            return res.status(400).json({msg:"user already existed!"})
        }

        const user = await User.create({
            name:name.trim(),
            email:email.trim(),
            password:password.trim(),
            collegeName:collegeName.trim(),
        })
        if(!user){
            return res.status(500).json({
                msg:"user didn't created!"
            })
        }

        return res.status(201).json({
            msg:"user created successfully",
            user:{_id:user._id,name:user.name,collegeName:user.collegeName ,email:user.email}
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Something went wrong!"
        })
    }
}

async function loginUser(req,res){
    try {
        const {email , password} = req.body;
        if(!(email.trim()) || !(password.trim()) ){
            return res.status(400).json({
                msg:"email and password fields are required!"
            })
        }

        const user = await User.findOne({email:email});

        if(!user){
            return res.status(404).json({
                msg:"no such user exist!"
            })
        }

        if(password.trim() !== user.password ){
            return res.status(401).json({
                msg:"wrong password!"
            })
        }
        const usr = await User.findOne({email:email}).select("-password");
        const accessToken = await user.generateAccessToken();

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .json({
            msg:"user loggedIn successfuly",
            user:usr,
            accessToken:accessToken
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Something went wrong!"
        })
    }
}


async function updateUserProfile(req,res){
    try {

        const {userId,name,email,collegeName,_id,branch,state,batch,location,contactNumber,companyName,jobTitle} = req.body;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                msg:"No such user Exist with given userId!"
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId,{
            name:name,
            email:email,
            collegeName:collegeName,
            branch:branch,
            state:state,
            branch:branch,
            batch:batch,
            location:location,
            contactNumber:contactNumber,
            companyName:companyName,
            jobTitle:jobTitle
        })

        if(!updatedUser){
            return res.status(500).json({
                mesaage:"Couldn't update user profile try again"
            })
        }
            
        // Now update user =>
        return res.status(201).json({
            mesaage:"user profile updated successfully",
            user:updatedUser,  
        })
    } 
    catch (error) {
        console.log(`uploading error : ${error}`);
        return res.status(500).json({
            msg:"Something went wrong!"
        })
    }
}

async function getUsersByBatchName(req,res){
    try {
        console.log(req.body);
        const {batchName} = req.body;
        if(!batchName || !(batchName?.trim())){
            return res.status(500).json({
                msg:"please provide a BatchName"
            })
        }

        const batchUsers = User.find({batchName:batchName});
        if(!batchUsers){
            return res.status(500).json({
                msg:"something went wrong while fetching batchUsers!"
            })
        }

        return res.status(200).json({
            msg:"get batch users successfully",
            users:batchUsers,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"something went wrong while fetching users"
        })
    }
}

async function getConnectedUsers(req,res){
    try {
        const {userId} = req.body;
        if(!userId || !(userId?.trim())){
            return res.status(400).json({
                msg:"please provide a user id"
            })
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                msg:"Provide a valid user id"
            })
        }

        const connectedUsersUserId = user.connectedUsers;

        const connectedUsers = await User.find({ _id: { $in: connectedUsersUserId } })

        return res.status(200).json({
            msg:"get connected users successfully",
            connectedUsers:connectedUsers
        })

    } catch (error) {
        return res.status(500).json({
            msg:"something went wrong while fetching users"
        })
    }
}

async function getUserById(req,res){
    try {
        const id = req.body?.userId;
        if(!id){
            return res.status(400).json({
                msg:"Please provide user id"
            })
        }
        
        const user = await User.findById(id).select('-password');
        if(!user){
            return res.status(400).json({
                msg:"Invalid user id"
            })
        }
        return res.status(200).json({
            msg:"found & sent user",
            user:user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"Something went wrong while fetching user"
        })
    }
}

export {
    registerUser,
    loginUser,
    updateUserProfile,
    getUsersByBatchName,
    getConnectedUsers,
    getUserById,
}