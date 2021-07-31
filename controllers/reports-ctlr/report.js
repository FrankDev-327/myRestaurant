'use strict';

const models = require('../../models');
const { Profit } = require('../../utils/buildin_objects')
const { setHour } = require('../../utils/dates.function');

module.exports = {
   viewProfits: async (req, res) => {
      try {
         var dataInfo;
         var setWhere = {};
         const params = req.body;
         const _date = new Date(await setHour());

         if (params.toDay === '') {
            setWhere = {
               where: {
                  dateAttending: _date,
                  statusAttending: false
               },
               attributes: ['prices', 'orders']
            };
         } else {
            setWhere = {
               where: {
                  dateAttending: params.toDay,
                  statusAttending: false
               },
               attributes: ['prices', 'orders']
            };
         }

         dataInfo = await models.AttendingWaiters.findAll(setWhere);
         if (dataInfo.length <= 0) {
            return res.status(202).json({
               code: 202,
               msg: 'There are no orders charged under that date.'
            });
         }

         var total = await Profit(dataInfo);
         return res.status(200).json({
            total: total[0],
            dataInfo,
            code: 200,
            msg: '.Income report'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   soldByWaiter: async (req, res) => {
      try {
         var dataInfo;
         var setWhere = {};
         const params = req.body;

         if (params.toDay === '') {
            setWhere = {
               where: {
                  waiterId: req.params.id,
                  statusAttending: false
               },
               attributes: ['orders', 'rates', 'prices']
            };
         } else {
            setWhere = {
               where: {
                  waiterId: req.params.id,
                  dateAttending: params.toDay,
                  statusAttending: false
               },
               attributes: ['orders', 'rates', 'prices']
            };
         }

         dataInfo = await models.AttendingWaiters.findAll(setWhere);
         if (dataInfo.length <= 0) {
            return res.status(202).json({
               code: 202,
               msg: 'There are no orders charged under that date.'
            });
         }
         var total = await Profit(dataInfo);
         return res.status(200).json({
            total: total[0],
            dataInfo,
            code: 200,
            msg: 'Income report'
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