'use strict';

const models = require('../../models');
const { encode } = require('../../middlewares/index');
const { validatePassword, hashingPassword } = require('../../utils/my_bcrypt');
const { toDoNewWaiter } = require('../../utils/buildin_objects');

module.exports = {
   createWaiter: async (req, res) => {
      try {
         const params = req.body;
         const infoWaiter = await toDoNewWaiter(params);
         const dataInfo = await models.Waiters.create(infoWaiter);

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'The check-in could not be processed. Internet again.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'A new employee has been created!!'
         });

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });

      }
   },
   listAllWaiter: async (req, res) => {
      try {
         const dataInfo = await models.Waiters.findAll();
         if (dataInfo.length <= 0) {
            return res.status(404).json({
               code: 404,
               msg: 'You have not registered a waiter.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'List of all waiters'
         });

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   viewWaiterDetail: async (req, res) => {
      try {
         const setWhere = { where: { id: req.params.id } };
         const dataInfo = await models.Waiters.findAll(setWhere);

         if (dataInfo.length <= 0) {
            return res.status(404).json({
               code: 404,
               msg: 'That person does not exist in your records.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Waiter Information.'
         });

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   accessWaiter: async (req, res) => { //Considerar una Google para acceder
      try {
         const waiterImage = req.body.waiterName;
         const setWhere = { where: { waiterName: waiterImage } };
         const pass = req.body.password;
         const infoWaiter = await models.Waiters.findAll(setWhere);

         if (infoWaiter.lenght <= 0) {
            return res.status(404).json({
               code: 404,
               msg: 'Bad nickname or password.'
            });
         }

         var validPass = await validatePassword(pass, infoWaiter.password);
         if (!validPass) {
            return res.status(404).json({
               code: 404,
               msg: 'Bad nickname or password.'
            });
         }

         const data = infoWaiter;
         const nick = infoWaiter.waiterName;
         infoWaiter.genericNickName = nick;
         const token = await encode(infoWaiter);
         return res.status(200).json({
            data,
            code: 200,
            token: token,
            msg: 'You are logged in!'
         });


      } catch (error) {
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   updateInfoWaiter: async (req, res) => {
      try {
         const idWaiter = {
            plain: true,
            where: {
               id: req.params.id
            },
            returning: true
         };
         const params = req.body;
         const pass = await hashingPassword(params.password);
         const dataInfo = await models.Waiters.update({ ...params, password: pass }, idWaiter);

         if (!dataInfo) {
            return res.status(404).json({
               code: 404,
               msg: 'There is no server to modify.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Information successfully modified.'
         });

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   }
}