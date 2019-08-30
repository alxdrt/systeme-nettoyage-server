var amqp = require('amqplib/callback_api');

const HOST = "localhost";

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/app", function(req, res) {
    console.log("lancement opération systeme nettoyage");
    res.redirect('SMA.html');
  });

  app.post("/", function(req, res) {
    res.status(200).send("POST REQUEST / Welcome to our restful API");
    
    amqp.connect('amqp://'+HOST, function(error0, connection) {
    if (error0) {
        throw error0;
    }
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
        process.exit(0);
    }, 500);
});


  });
}




module.exports = appRouter;
