const {loginUser} = require('../../controllers/userController.js')

module.exports = (req,res) => {
    return loginUser(req,res)
}