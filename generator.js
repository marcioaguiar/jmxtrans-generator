var fs = require('fs');
var _  = require('lodash');

function start(configFile, output) {

	if (!output) {
		console.log('no output defined');
		return;
	}

	var fileOpts = { encoding: 'UTF-8' };
	var configuration = JSON.parse(fs.readFileSync(configFile, fileOpts));

	var servers = [];

	_.forIn(configuration.servers, function(server, serverName) {
		console.log('configuring server', serverName);
		servers.push(configureServer(server, configuration));
	});

	var content = JSON.stringify({ servers: servers });
	fs.writeFileSync(output, content, fileOpts);

}

function configureServer(server, configuration) {
	var actualQueries = [];

	server.queries.forEach(function(query) {

		var q = _.clone(configuration.queries[query]);
		actualQueries.push(q);
		q.outputWriters = [];
		server.writers.forEach(function(writer) {
			q.outputWriters.push(configuration.outputWriters[writer]);
		});
	});

	server.queries = actualQueries;

	return server;
};

if (process.argv < 4) {
	console.log('Usage: node generator.js [input] [output]');
	return;
}

start(process.argv[2], process.argv[3]);