'use strict';

const models = require('../../models');

module.exports = {
   createCategory: async (req, res) => {
      try {
         const params = req.body;
         const dataInfo = await models.Categories.create({ ...params });

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'There was an error entering the data. Try again.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Added Category.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   listCategories: async (req, res) => {
      try {
         const dataInfo = await models.Categories.findAll();
         if (dataInfo.length <= 0) {
            return res.status(403).json({
               code: 403,
               msg: 'There was an error listing the data. Try again.'
            });
         }
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'List of categories.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   changesCatergoryShow: async (req, res) => {
      try {
         const stmt = { show: false };
         const setData = {
            plain: true,
            where: {
               id: req.params.id
            },
            returning: true
         };
         const dataInfo = await models.Categories.update(stmt, setData);

         if (!dataInfo) {
            return res.status(403).json({
               code: 403,
               msg: 'That category is not registered.'
            });
         }
         
         return res.status(200).json({
            code: 200,
            msg: 'Status change to not show the category.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Al parecer, el servicio no está disponible en estos momentos.'
         });
      }
   }
}