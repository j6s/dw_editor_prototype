var http = require('http');
var express = require('express');
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');

var backend = new ShareDB();
Promise.all([
    createDocument('examples/textarea', 'example'),
    createDocument('blue/main.css', '/* blue CSS */'),
    createDocument('blue/main.js', '/* blue JS */'),
    createDocument('blue/index.html', '<!-- blue HTML -->'),
    createDocument('red/main.js', '/* red JS */'),
    createDocument('red/main.css', '/* red CSS */'),
    createDocument('red/index.html', '<!-- red HTML -->'),
]).then(startServer)

/**
 * Creates a document and returns it in a promise
 * @param name
 */
function createDocument(name, content) {
    return new Promise(function(resolve) {
        var connection = backend.connect();
        var parts = name.split('/');
        var doc = connection.get(parts[0], parts[1]);
        doc.fetch(function(err) {
            if (err) throw err;
            if (doc.type === null) {
                doc.create(content || '', function() { resolve(doc); });
                return;
            }
            resolve(doc);
        });
    })
}


function startServer() {
  // Create a web server to serve files and listen to WebSocket connections
  var app = express();
  app.use(express.static('static'));
  var server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({server: server});
  wss.on('connection', function(ws, req) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(8090);
  console.log('Listening on http://localhost:8080');
}
