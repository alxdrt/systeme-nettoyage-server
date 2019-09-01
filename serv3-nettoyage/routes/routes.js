var amqp = require('amqplib/callback_api');
var request = require('request');
var path = require('path');

const pwd = 'guest:robots1@';
const HOST = "51.91.21.19:32511/";

var appRouter = function (app) {

  app.get("/", function(req, res) {
    console.log("lancement opération systeme nettoyage");
    res.sendFile(path.resolve('public/SMA.html'));
  });

  app.post("/", function(req, res) {
    res.status(200).send("POST REQUEST / Welcome to our restful API");
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
        var msg = 'Lancement opération';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
    }, 500);
});


  });
}




module.exports = appRouter;
