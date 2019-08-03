// The code (in receive.js) has the same require as send:
var amqp = require('amqplib/callback_api');

// Setting up is the same as the publisher; we open a connection and a channel, 
// and declare the queue from which we're going to consume. 
// Note this matches up with the queue that sendToQueue publishes to.
amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'robots';

    channel.assertQueue(queue, {
      durable: false
    });
  });
});


// Note that we declare the queue here, as well. Because we might start the consumer before the publisher, 
// we want to make sure the queue exists before we try to consume messages from it.

// We're about to tell the server to deliver us the messages from the queue. 
// Since it will push us messages asynchronously, we provide a callback that will be executed when 
// RabbitMQ pushes messages to our consumer. This is what Channel.consume does.
console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
channel.consume(queue, function(msg) {
  console.log(" [x] Received %s", msg.content.toString());
}, {
    noAck: true
  }); 