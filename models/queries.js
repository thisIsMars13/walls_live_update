const db = require('../config');

function get_all_data(table) {
    const query = `select * from ${table};`
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}

function get_data(table, column, data) {
    const query = `select * from ${table} where ${column} = ?;`
    return new Promise(function (resolve, reject) {
        db.query(query, [data], function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}

function insert_data(table, columns, data) {
    const query = `INSERT INTO ${table} (${columns.join(",")}, created_at, updated_at) VALUE (${columns.map(el => "?").join(",")}, now(), now());`;
    return new Promise(function (resolve, reject) {
        db.query(query, data, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}

function update_data(table, columns, condition, data) {
    const query = `UPDATE ${table} SET ${columns.map(el => `${el} = ?`).join(',')} WHERE ${condition}`;
    return new Promise(function (resolve, reject) {
        db.query(query, data, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}

function query(query, data) {
    return new Promise(function (resolve, reject) {
        db.query(query, data, function (err, res) {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    })
}

module.exports = {
    get_all_data,
    get_data,
    insert_data,
    update_data,
    query
}