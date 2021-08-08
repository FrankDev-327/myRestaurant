'use strict';
////
const models = require('../../models');
const { sendQueue } = require('../../utils/sending_queues');
const { buildCreateAttending } = require('../../utils/buildin_objects')

module.exports = {
   createAttending: async (req, res) => {
      try {
         const params = req.body;
         params.waiterId = req.users.id;
         const objAtt = await buildCreateAttending(params);
         const dataInfo = await models.AttendingWaiters.create(objAtt);;

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'There was an error entering the data. Try again.'
            });
         }

         const data = {
            orders: dataInfo.orders,
            tableId: dataInfo.tableId,
            dateAttending: dataInfo.dateAttending,
            actualTableAttending: dataInfo.actualTableAttending,
         }
         await sendQueue(data);
         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Busy table.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   listAttendByWaiter: async (req, res) => {
      try {
         const waiterId = req.params.waiterId
         const setwhere = { where: { waiterId: waiterId } };
         const dataInfo = await models.AttendingWaiters.findAll(setwhere);

         if (dataInfo.length <= 0) {
            return res.status(202).json({
               code: 202,
               msg: 'Has not attended anyone.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Your attentions.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   changesStatusAttending: async (req, res) => {
      try {
         const setWhere = {
            plain: true,
            where: {
               id: req.params.id
            },
            returning: true,
            paranoid: true
         };
         const stmt = {
            statusAttending: false,
            rates: req.body.rates
         };
         const dataInfo = await models.AttendingWaiters.update(stmt, setWhere);

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'The status was not changed. Try again.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'Service done.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   paymentConsume: async (req, res) => {
      try {
         const tableId = req.params.tableId;
         const setWhere = { where: { tableId: tableId } };
         const dataInfo = await models.AttendingWaiters.findOne(setWhere);

         if (!dataInfo) {
            return res.status(202).json({
               code: 202,
               msg: 'This table has not been paid.'
            });
         }

         return res.status(200).json({
            dataInfo,
            code: 200,
            msg: 'At this table it was paid.'
         });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
            code: 500,
            msg: 'Apparently, the service is not available at the moment.'
         });
      }
   },
   changeStateTable: async (req, res) => {
      try {
         const tablesId = [];
         const setWhere = {
            where: { statusAttending: true },
            attributes: ['id', 'statusAttending']
         };

         const dataInfo = await models.AttendingWaiters.findAll(setWhere);
         if (dataInfo.length <= 0) {
            return res.status(200).json({
               code: 200,
               msg: 'The tables are still occupied.'
            });
         }

         (dataInfo && dataInfo.map(value => tablesId.push(value.id)));
         await models.AttendingWaiters.update({ statusAttending: false },
            { where: { id: tablesId } });

         return res.status(200).json({
            code: 200,
            msg: 'All tables were updated.'
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