'use strict';

const models = require('../../models');
module.exports = {
   createTable: async (req, res) => {
      try {
         const params = req.body;
         const dataInfo = await models.Tables.create({ ...params });

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'The check-in could not be processed. Internet again.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Table created!'
         });

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   listTable: async (req, res) => {
      try {
         const dataInfo = await models.Tables.findAll();

         if (dataInfo.length <= 0) {
            return res.status(202).json({
               code: 202,
               msg: 'Apparently he did not search tables.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Tables available!'
         });

      } catch (error) {
         console.log('listTable');
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   }
}