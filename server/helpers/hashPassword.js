const bcrypt = require('bcryptjs')

function hashPassword(password) {
    try {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        return hash
    } catch(err) {
        console.log(err);
    }
}

module.exports = hashPassword;