const { ConnectionStates } = require('mongoose');
const {loginUser} = require('../../controllers/userController.js')

export default async function(req,res){

    if(req.method === 'POST'){
        console.log("it is a post method");
        const x = await loginUser(req,res);
        console.log(x);
    }
    else {
        fun(req,res);
    }
}

async function fun(req,res) {
  return res.json({
    msg:"good"
  })
}