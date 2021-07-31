const set = require('../set-ups/setting');
const amq = require('amqplib/callback_api');

module.exports = {
    sendQueue: async (objData) => {
        amq.connect(set.rabbit, function (err, conn) {
            if (err != null) {
                bail(err);
            }
            conn.createChannel(function (err, channel) {
                if (err != null) {
                    bail(err);
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

function bail(err) {
    console.error(err);
    process.exit(1);
 }