const jwt = require('jsonwebtoken');

function authentication(req, res, next){
    const accessToken = req.headers.accessToken;
    try{
        if(!accessToken){
            res.status(404).json({
                message: 'token not not found'
            })
        }else{
            const decoded = jwt.verify(accessToken, 'rahasia');
            req.userId = decoded.userId;
            req.email = decoded.email;
            next();
        }
    }catch(err){
        res.status(400).json({message : err.message});
    }
}
module.exports = authentication;