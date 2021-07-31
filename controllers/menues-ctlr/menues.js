'use strict';

const models = require('../../models');
var path = require('path');

module.exports = {
   createMenues: async (req, res) => {
      try {
         const params = req.body;
         const dataInfo = await models.Menues.create({ ...params });

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'Registration could not be completed. Try again.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Menu added successfully.'
         });

      } catch (error) {
         console.log(params);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   listMenuByCategory: async (req, res) => {
      try {
         const query = { where: { category: req.params.idCat } };
         const dataInfo = await models.Menues.findAll(query);

         if (dataInfo.length <= 0) {
            return res.status(404).json({
               code: 404,
               msg: 'There are no menus with that category.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Menu for its category.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   editMenue: async (req, res) => {
      try {
         const params = req.body;
         const idMenu = {
            plain: true,
            where: {
               id: req.params.id
            },
            returning: true
         };
         const dataInfo = await models.Menues.update({ ...params }, idMenu);

         if (!dataInfo) {
            return res.status(404).json({
               code: 404,
               msg: 'There are no menus with that category.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Menu for its category.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   deleteMenu: async (req, res) => {
      try {
         const setWhere = {
            benchmark: true,
            where: { id: req.params.id }
         };
         const dataInfo = await models.Menues.destroy(setWhere);

         if (dataInfo <= 0) {
            return res.status(404).json({
               code: 404,
               msg: 'There is no such menu with that identifier.'
            });
         }

         return res.status(200).json({
            code: 200,
            msg: 'Menu removed successfully.'
         });

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   viewDetailMenu: async (req, res) => {
      try {
         const setWhere = { where: { id: req.params.id } };
         var dataInfo = await models.Menues.findOne(setWhere);

         if (!dataInfo) {
            return res.status(404).json({
               code: 404,
               msg: 'This menu does not exist.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Menu details.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
}