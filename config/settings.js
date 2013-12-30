var path = require('path');

var settings = {
    path: path.normalize(path.join(__dirname, '..')),
    port: process.env.NODE_PORT || 3000,
    database: {
        protocol: "mysql", // or "postgresql"
        query: { pool: true },
        host: "127.0.0.1",
        database: "btc_tp_dev",
        user: "root",
        password: "m6i1m2a3"
    }
};

module.exports = settings;
