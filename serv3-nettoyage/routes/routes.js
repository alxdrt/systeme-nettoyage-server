var amqp = require('amqplib/callback_api');
var request = require('request');
var path = require('path');

// TODO hide it !
const pwd = 'guest:robots@';
const HOST = "51.91.21.19:32390/";

//exchange parameters
var exchange_name = 'robots_exchange';
var exchange_type = 'direct';
var routing_key = 'cleaning-signal';

var start_signal = 'start-operation';
var pause_signal = 'pause-operation';
var resume_signal = 'resume-operation';
var stop_signal = 'stop-operation';


function sendMessage(connection,curMsg){

  connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
           
	    //creation of exchange
        channel.assertExchange(exchange_name, exchange_type, {
          durable: true
        });

	    channel.publish(exchange_name, routing_key, Buffer.from(curMsg));
        console.log(" [x] Sent %s", curMsg);
      setTimeout(function() {
        connection.close();
      }, 500);

    });

}

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

        console.log('Connecté : Try to send cmd on queue : '+start_signal);
        sendMessage(connection, start_signal);
        res.sendFile(path.resolve('public/SMA.html'));
      });
    });


  app.post("/stop", function(req, res) {
    console.log('Try to send amqp request to robots');
    amqp.connect('amqp://'+pwd+HOST, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        console.log('Connecté : Try to send cmd on queue');
        sendMessage(connection, stop_signal);
        res.sendFile(path.resolve('public/SMA.html'));
      });
    });


  app.post("/pause", function(req, res) {
    console.log('Connecté : Try to send amqp request to robots');
    amqp.connect('amqp://'+pwd+HOST, function(error0, connection) {
        if (error0) {
            throw error0;
        }

        console.log('Try to send cmd on queue');
        sendMessage(connection, pause_signal);
        res.sendFile(path.resolve('public/SMA.html'));
      });
    });


  app.post("/resume", function(req, res) {
    console.log('Try to send amqp request to robots');
    amqp.connect('amqp://'+pwd+HOST, function(error0, connection) {
        if (error0) {
            throw error0;
        }

        console.log('Try to send cmd on queue');
        sendMessage(connection, resume_signal);
        res.sendFile(path.resolve('public/SMA.html'));
      });
    });

}




module.exports = appRouter;
