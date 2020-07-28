const mongoose = require("mongoose");
const models = require('./models.js')

module.exports = {
    name: 'points',
    usage: '',
    description: 'Shows the amount of points that given user has.',
    run: async (msg,args) => {
        if (mongoose.connection.readyState != 1){
            return msg.channel.send('The database is currently unavailable.');
        }
        if (msg.channel.type == 'dm') {
            return msg.channel.send('You can not use this command in private messages.');
        }

        let user;

        if (args.length == 0) {
            user = msg.author;
        } else if (args.length == 1 && msg.mentions.users.size == 1) {
            user = msg.mentions.users.first();
        } else {
            return msg.channel.send('Invalid arguments.');
        }

        let Points = models.Points;
        let document = await Points.findOne({userID: user.id});

        if (document == null) {
            document = new models.Points({userID: user.id, points: 0});
            await document.save();
        }

        if (user == msg.author) {
            msg.reply(((msg.channel.type == 'dm') ? 'You' : 'you') + ` you have ${document.points} points.`);
        } else {
            msg.channel.send(`${user} has ${document.points} points.`);
        }
    }
}