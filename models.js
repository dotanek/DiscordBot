const mongoose = require("mongoose");

module.exports = {

    init: () => {

        module.exports.Points = mongoose.model('Points', points_schema);
        module.exports.Prefixes = mongoose.model('Prefixes', prefixes_schema)
    }
}

const points_schema = new mongoose.Schema({
    userID: String,
    points: Number
});

const prefixes_schema = new mongoose.Schema({
    serverID: String,
    serverName: String,
    prefix: String
});