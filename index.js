var webhooktweeterFactory = require('./webhooktweeter');
var config = require('./config');
var http = require('http');
var Twit = require('twit');

var twit = new Twit(config.twitter);

var webhooktweeter = webhooktweeterFactory({
  twit: twit
});

function takeRequest(req, res) {
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end('OK');
  }
  else if ('content-type' in req.headers && req.method === 'POST' &&
    req.headers['content-type'].toLowerCase()
    .indexOf('application/json') === 0) {

    var body = '';

    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function doneReadingData() {
      respondToRequestWithBody(req, body, res, headers);
    });
  }
  else {
    res.writeHead(304, headers);
    res.end();
  }
}

function respondToRequestWithBody(req, body, res, headers) {
  headers['Content-Type'] = 'text/json';
  console.log('body', body);
  try {
    webhooktweeter.reportCommitsFromPayload(JSON.parse(body));
  }
  catch (e) {
    console.log(e);
  }
  
  res.writeHead(200, headers);
  res.end();
}


http.createServer(takeRequest).listen(3002);

console.log('Server running at 3002.');

