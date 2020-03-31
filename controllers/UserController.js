const { User } = require('../models');
const checkPassword = require('../helpers/checkPassword');
const jwt = require('jsonwebtoken');
class UserController {
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
    static login(req, res){
        let input = req.body;
        User.findOne({where : {email : input.email}})
            .then( user => {
                if(!user){
                    res.status(400).json({message : 'Invalid Username'});
                }else{
                    if(checkPassword(input.password, user.password)){
                        const accessToken = jwt.sign({
                            userId : user.id,
                            email : user.email
                        }, 'rahasia');
                        res.status(201).json({accessToken});
                    }else{
                        res.status(400).json({message : 'Invalid Password'});
                    }
                }
            })
            .catch(err => {
                res.status(500).json({message : err.message});
            });
    }
}
module.exports = UserController;
