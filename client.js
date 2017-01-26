var sharedb = require('sharedb/lib/client');
var StringBinding = require('sharedb-string-binding');

// Open WebSocket connection to ShareDB server
var socket = new WebSocket('ws://' + window.location.host);
var connection = new sharedb.Connection(socket);
var bindings = {
    '#blue_css': 'blue/main.css',
    '#blue_js': 'blue/main.js',
    '#blue_html': 'blue/index.html',
    '#red_css': 'red/main.css',
    '#red_js': 'red/main.js',
    '#red_html': 'red/index.html',
    '#example': 'examples/textarea'
};

document.addEventListener('DOMContentLoaded', function() {
    Object.keys(bindings).forEach(function(selector) {
        setupBinding(selector, bindings[selector]);
    });
})

function setupBinding(cssSelector, docName) {
  var element = document.querySelector(cssSelector);
  if (!element) { return; }
  var parts = docName.split('/');
  var doc = connection.get(parts[0], parts[1]);
  doc.subscribe(function(err) {
      if (err) {
          console.error('error setting up binding', cssSelector, docName, err);
          throw err;
      }

      (new StringBinding(element, doc)).setup();
  })
}



// Create local Doc instance mapped to 'examples' collection document with id 'textarea'
/*var doc = connection.get('examples', 'textarea');
doc.subscribe(function(err) {
  if (err) throw err;
  var element = document.querySelector('textarea');
  var binding = new StringBinding(element, doc);
  binding.setup();
});*/
