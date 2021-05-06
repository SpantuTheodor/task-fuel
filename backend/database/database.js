const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const mongo_atlas_uri = encodeURI(process.env.MONGO_ATLAS_URI);

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongo_atlas_uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
                console.log(err)
            })
    }
}

module.exports = new Database();