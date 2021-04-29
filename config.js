const mysql = require('mysql');
const credentials = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'user_dashboard'
}

const db = mysql.createConnection(credentials);

if (!db._connectCalled) {
    db.connect();
}

module.exports = db;