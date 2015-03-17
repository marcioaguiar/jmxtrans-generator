var fs = require('fs');
var _  = require('lodash');

function start(serverFile, writersFile, queriesFile, output) {

	if (!output) {
		console.log('no output defined');
		return;
	}

	var fileOpts = { encoding: 'UTF-8' };
	var inputServers = JSON.parse(fs.readFileSync(serverFile, fileOpts));
	var queries = JSON.parse(fs.readFileSync(queriesFile, fileOpts));
	var writers = JSON.parse(fs.readFileSync(writersFile, fileOpts));

	var servers = [];

	_.forIn(inputServers, function(server, serverName) {
		console.log('configuring server', serverName);
		servers.push(configureServer(server, queries, writers));
	});

	var content = JSON.stringify({ servers: servers });
	fs.writeFileSync(output, content, fileOpts);

}

function configureServer(server, queries, writers) {
	var actualQueries = [];

	server.queries.forEach(function(query) {

		if (!queries[query]) {
			console.log('query not found:', query);
			return;
		}

		var q = _.clone(queries[query]);

		actualQueries.push(q);

		q.outputWriters = [];
		server.writers.forEach(function(writer) {
			if (!writers[writer]) {
				console.log('writer not found:', writer);
			}
			q.outputWriters.push(writers[writer]);
		});

	});

	delete server.writers;

	server.queries = actualQueries;

	return server;
};

if (process.argv < 6) {
	console.log('Usage: node generator.js [servers-file] [writers-file] [queries-file] [output]');
	return;
}

start(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);