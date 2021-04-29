let client = require('redis').createClient(6379);

function get(key) {
    return new Promise(function (resolve, reject) {
        client.get(key, function (err, result) {
            resolve(result);
        });
    });
}

function setExpiration(key, time, data) {
    client.setex(key, time, data);
}

function flush() {
    client.flushall();
}

module.exports = {
    get,
    setExpiration,
    flush
}