'use strict';

const moment = require('moment');
const models = require('../../models');
const jwt = require('jwt-simple');
const objConf = require('../../set-ups/setting');

exports.authMethod = async (req, res, next) => {
   try {
      if (!req.headers.authorization) {
         return res.status(403).json({
            message: 'La peticion no tiene la cabecera de autenticacion'
         });
      }

      const token = req.headers.authorization.replace(/['"]+/g, '');
      const payload = jwt.decode(token, objConf.secret, true);

      if (payload.exp <= moment().unix) {
         return res.status(403).json({
            message: 'The token has expired'
         });
      }

      const objBkl = { unableToken: token };
      const findToken = await models.BlackListToken.findAll(objBkl);
      if (!findToken) {
         await models.BlackListToken.create(objBkl);
      }
      
      const auxObj = {
         idWaiter: payload.id,
         entryWork: new Date(),
         nickName: payload.genericNickName
      };
      await models.TrackingLogin.create(auxObj);

   } catch (error) {
      console.log(error)
      return res.status(403).json({
         message: 'invalid token'
      });
   }
   req.users = payload;
   next();
}