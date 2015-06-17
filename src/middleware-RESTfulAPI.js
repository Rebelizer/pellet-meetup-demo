// server only code via manifest.json "server-dependencies"

var pellet = require('pellet')
  , rest = require('connect-rest')
  , orientoDB = require('oriento');

var db;

// pellet.options is only on the server - and comes from
// the config/* pellet.options=application.options.*

// only init the database if we have a config file
if(!pellet.options.orientdb) {
  console.info('Skip loading database middleware');
} else {

  // make sure we have connected to the database before
  // letting Pellet start and receiving traffic
  pellet.registerInitFn(function (next) {
    db = orientoDB(pellet.options.orientdb).use({
      name: pellet.options.orientdb.name,
      username: pellet.options.orientdb.username,
      password: pellet.options.orientdb.password
    });

    console.info('connect to the database', JSON.stringify(pellet.options.orientdb, null, 2));

    next();
  });

  // Setup the RESTFul api
  var api = rest.rester({
    apiKeys: ['849b7648-14b8-4154-9ef2-8d1dc4c2b7e9'],
    context: '/api',
    discoverPath: 'discover',  // http://localhost:8080/api/discover/1.0.0
    protoPath: 'proto' // http://localhost:8080/api/proto/POST/1.0.0/api/twist?api_key=
  });

  rest.post({path: '/select', version: '>=1.0.0'}, function (request, content, next) {
    db.query(content.SQL, {params: content.params, limit: content.limit || 10}).then(function (rec) {
      next(null, rec);
    });
  });

// add RESTFul API to our middleware
  pellet.middlewareStack.push({
    priority: 4,
    fn: api
  });
}