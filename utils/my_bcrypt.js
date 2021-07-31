
const bcrypt = require('bcrypt');
const ROUDN_TO_PASS = 10;

module.exports = {
    hashingPassword: async (password) => {
        return await bcrypt.hash(password, ROUDN_TO_PASS);
    },
    validatePassword: async (pass, _pass) => {
        return await bcrypt.compare(pass, _pass);
    }
}