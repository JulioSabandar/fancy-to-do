const { User } = require('../models');
const checkPassword = require('../helpers/checkPassword');
const hashPassword = require('../helpers/hashPassword');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
 

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
                    res.status(400).json({message : 'Invalid Email'});
                }else{
                    if(checkPassword(input.password, user.password)){
                        const accessToken = jwt.sign({
                            userId : user.id,
                            email : user.email
                        }, process.env.JWT_SECRETKEY);
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
    static loginGoogle(req,res){
        const token = req.body.token;
        const userData = {}
        client.verifyIdToken({
          idToken:token,
          audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(data=>{
          const payload = data.getPayload();
          userData.email = payload.email;
          userData.password = hashPassword('randomPassword')
           return User.findOne({
            where:{
              email: payload.email
            }
          })
        })
        .then(user=>{
          if(user){
            return user
          }else{
            return User.create(userData)
          }
        })
        .then(theUser=>{
          const accessToken = jwt.sign({
            userId : theUser.id,
            email: theUser.email
          }, process.env.JWT_SECRETKEY)
          res.status(200).json({accessToken})
        })
        .catch(err=>{
          res.status(500).json({message : err.message})
        })
    }
}
module.exports = UserController;
