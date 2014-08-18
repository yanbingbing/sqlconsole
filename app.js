var fs = require('fs');
var engine = require('engine.io');
var http = require('http').createServer().listen(2318);

var sqllogfile = '/path/to/mysql/sql.log';
var fd = fs.openSync(sqllogfile, 'r');
var stats = fs.fstatSync(fd);
var lastSize = stats.size;

fs.watch(sqllogfile, function () {
    var stats = fs.fstatSync(fd);
    if (stats.size > lastSize) {
        var str = read(stats.size - lastSize, lastSize);
        consoleToClient(str);
    }
    lastSize = stats.size;
});

function read(length, offset) {
    var buf = new Buffer(length);
    fs.readSync(fd, buf, 0, length, offset);
    return buf.toString();
}

var client = engine.attach(http);
var clients = [];
client.on('connection', function (socket) {
    console.info('a client link on');
    clients.push(socket);
    socket.once('close', function () {
        var i = clients.indexOf(socket);
        i > -1 && clients.splice(i, 1);
        console.info('a client off');
    });
});


function consoleToClient(obj) {
    var str = JSON.stringify(obj);
    clients.forEach(function (sock) {
        sock.send(str);
    });
}

console.info('server start');