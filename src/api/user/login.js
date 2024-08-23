const {loginUser} = require('../../controllers/userController.js')

module.exports = (req,res) => {
    loginUser(req,res)
}