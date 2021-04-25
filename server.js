var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var videos = require('./routes/videos.js');

console.log('Run on port ' + port);
console.log('Hiiii..')

app.use(express.static(__dirname + '/dist'));

app.use('/api/videos', videos);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.listen(port);