const {loginUser} = require('../../controllers/userController.js')

module.exports = (req,res) => {

    if(req.method === 'POST'){
        console.log("it is a post method");
        loginUser(req,res);
    }
    else {
        return res.status(300).json({msg:"only post req!!"})
    }
}