'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const objConf = require('../../set-ups/setting');

exports.ecodeObject = async (usrObj) {
    const payload = {
       id:usrObj.id,
       firstName:usrObj.name,
       genericNickName: objConf.genericNickName,
       numberType:usrObj.numberType,
       lastName: usrObj.lastname,
       nameType:usrObj.nameType,
       iat: moment().unix(),
       exp: moment().add(5, 'minutes').unix
    }
    const hash = jwt.encode(payload, objConf.secret);
    return hash;
 }