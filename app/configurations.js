const path = require('path');

require('dotenv-safe').load({
    allowEmptyValues: true,
    path: path.join(__dirname, '..', '.env'),
    sample: path.join(__dirname, '..', '.env.example')
});

module.exports = {
    db: {
        connection: process.env.DB_CONNECTION
    },
    ttl: process.env.TTL
};