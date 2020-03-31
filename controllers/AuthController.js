const { User } = require('../models')
 
class AuthController {
    static register(req, res){
        User.create({
            email : req.body.email,
            password : req.body.password
        })
        .then( user => {
            res.status(201).json({user});
        })
        .catch(err => {
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json({message : err.message});
            }else{
                res.status(500).json({message : err.message});
            }
        });
    }
    static login(){
        
    }
}
module.exports = AuthController;
