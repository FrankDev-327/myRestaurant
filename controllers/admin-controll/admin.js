'use strict';

const models = require('../../models');
const { hashingPassword, validatePassword } = require('../../utils/my_bcrypt')
const { encode } = require('../../middlewares/index')

module.exports = {
   createAdministrator: async (req, res) => {
      try {
         const params = req.body;
         const hassPass = await hashingPassword(params.password);
         var dataInfo = await models.Administrator.create({ ...params, password: hassPass });

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'There was a error. Try again.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Personal was created successful.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'It seems the service is not working well.'
         });
      }
   },
   loginAdministrator: async (req, res) => {
      try {
         const params = req.body;
         const { password, email } = params;
         const setWhere = { where: { email: email } };
         const infoAdmin = await models.Administrator.findAll(setWhere);

         if (!infoAdmin) {
            return res.status(404).json({
               code: 404,
               msg: 'Email or password are incorrect.'
            });
         }

         const _pass = infoAdmin.password;
         const checkPass = await validatePassword(password, _pass);
         if (!checkPass) {
            return res.status(404).json({
               code: 404,
               msg: 'Email or password are incorrect.'
            });
         }

         const data = infoAdmin;
         const nick = infoAdmin.nickName;
         infoAdmin.genericNickName = nick;
         const token = encode(infoAdmin);

         return res.status(200).json({
            data,
            code: 200,
            token: token,
            msg: 'Login success.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   updateAdministrator: async (req, res) => {
      try {
         const params = req.body;
         const idAdm = req.params.id;
         const setWhere = {
            plain: true,
            where: {
               id: idAdm
            },
            returning: true
         };
         const pass = await hashingPassword(params.password)
         var dataInfo = await models.Administrator.update({ ...params, password: pass }, setWhere);
         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'There was an error updating the data. Try again.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Updated staff.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   listAdministrator: async (req, res) => {
      try {
         var dataInfo;
         const setBySearch = req.params.search;

         dataInfo = (!setBySearch) ? await models.Administrator.findAll() :
            await models.Administrator.findAll({ where: { profile: setBySearch } });


         if (dataInfo.length <= 0) {
            return res.status(202).json({
               code: 202,
               msg: 'There was an error updating the data. Try again.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'List of staff.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   }
}