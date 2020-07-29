const mongoose = require("mongoose");

module.exports = {

    init: () => {

        //module.exports.Points = mongoose.model('user-points', points_schema);
        //module.exports.Prefixes = mongoose.model('server-prefixes', prefixes_schema)
        module.exports.DinoLevels = mongoose.model('dino-level', dino_level_schema)
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

const dino_level_schema = new mongoose.Schema({
    userID: String,
    level: Number,
    experience: Number
});