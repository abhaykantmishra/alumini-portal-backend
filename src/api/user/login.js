const {loginUser} = require('../../controllers/userController.js')

module.exports = (req,res) => {
    if(req.method == 'post'){
        return loginUser(req,res);
    }
    else {
        return res.status(300).json({msg:"only post req!!"})
    }
}