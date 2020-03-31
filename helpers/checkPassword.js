const bcrypt = require('bcryptjs');

function checkPassword(password, hash) {
    try{
        return bcrypt.compareSync(password, hash)
    }catch(err){
        console.log(err);
    }
}

module.exports = checkPassword;