var pomelo = require('pomelo');
var routeUtil = require('./app/util/routeUtil');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'chatofpomelo');


// app configure
app.configure('production|development', function() {
	// route configures
	app.route('chat', routeUtil.chat);

	// filter configures
	app.filter(pomelo.timeout());
    app.set('connectorConfig', {
        connector : pomelo.connectors.hybridconnector,
        useDict : true,
        useProtobuf : true
    });

    app.set('errorHandler', function (err, msg, resp, session, next) {
        console.log(err, msg, resp, session);
        next();
    });
});


// start app
app.start();

process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});