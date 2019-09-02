var amqp = require('amqplib/callback_api');
var request = require('request');
var path = require('path');

const pwd = 'guest:robots@';
const HOST = "51.91.21.19:30854/";

var appRouter = function (app) {

  app.get("/", function(req, res) {
    console.log("lancement opération systeme nettoyage");
    res.sendFile(path.resolve('public/SMA.html'));
  });

  app.post("/", function(req, res) {
    console.log('Try to send amqp request to robots');
    amqp.connect('amqp://'+pwd+HOST, function(error0, connection) {
    if (error0) {
        throw error0;
    }

    console.log('Try to send cmd on queue');

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'Robots';
        var msg = '{signal: \"start-drone\"}';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
        res.sendFile(path.resolve('public/SMA.html'));
    });
    setTimeout(function() {
        connection.close();
    }, 500);
});


  });
}




module.exports = appRouter;
