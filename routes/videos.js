const fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var mediaPath = "/Users/shantanu/Movies";
var recursiveReadSync = require('recursive-readdir-sync');

const extensions = ['.mkv', '.mp4'];

router.get('/', function (req, res) {
    var files = fs.readdirSync(mediaPath);
    var path = require('path');
    files = files.filter(file => extensions.includes(path.extname(file)));
    res.json(files);
});

router.get('/video', function (req, res) {
    var path = mediaPath + '/' + decodeURIComponent(req.query.filename);
    var stat = fs.statSync(path);
    var total = stat.size;
    if (req.headers['range']) {
        var range = req.headers.range;
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total - 1;
        var chunksize = (end - start) + 1;

        var file = fs.createReadStream(path, { start: start, end: end });
        res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
        file.pipe(res);
    } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
        fs.createReadStream(path).pipe(res);
    }
});

module.exports = router;