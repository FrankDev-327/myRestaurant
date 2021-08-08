const set = require('../set-ups/setting');
const amq = require('amqplib/callback_api');

module.exports = {
    sendQueue: async (objData) => {
        amq.connect(set.rabbit, function (err, conn) {
            if (err != null) {
                console.log(err)
                return 
            }
            conn.createChannel(function (err, channel) {
                if (err != null) {
                    console.error(err);
                    return ;
                }
                objData = JSON.stringify(objData);
                channel.assertQueue(set.memorydb);
                channel.sendToQueue(set.memorydb, Buffer.from(objData), {
                    persistent: true
                });
            });
        });
    }
}