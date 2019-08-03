// We'll call our message publisher (sender) send.js and our message consumer (receiver) receive.js.
// The publisher will connect to RabbitMQ, send a single message, then exit.

//In send.js, we need to require the library first:

var amqp = require('amqplib/callback_api');

//then connect to RabbitMQ server
amqp.connect('amqp://localhost', function(error0, connection) {});


//Next we create a channel, which is where most of the API for getting things done resides:
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {});
});

//To send, we must declare a queue for us to send to; then we can publish a message to the queue:
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'robots';
    var msg = 'Lancement opération';

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
});

// Lastly, we close the connection and exit;
setTimeout(function() { 
  connection.close(); 
  process.exit(0) 
  }, 500);