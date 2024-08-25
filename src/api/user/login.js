const { ConnectionStates } = require('mongoose');
const {loginUser} = require('../../controllers/userController.js')

module.exports =async (req,res) => {

    if(req.method === 'POST'){
        console.log("it is a post method");
        const x = await loginUser(req,res);
        console.log(x);
    }
    else {
        return fun(req,res);
    }
}

async function fun(req,res) {
  return res.json({
    msg:"good"
  })
}