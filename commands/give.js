const mongoose = require("mongoose");
const models = require('./models.js')

module.exports = {
    name: 'give',
    usage: '.anwser',
    description: 'Transfers certain amount of points to given user.',
    run: async (msg,args) => {
        if (mongoose.connection.readyState != 1){
            return msg.channel.send('The database is currently unavailable.');
        }
        if (msg.channel.type == 'dm') {
            return msg.channel.send('You can not use this command in private messages.');
        }

        let user;
        let amount;

        if (args.length == 2 && msg.mentions.users.size == 1) {
            if (msg.mentions.users.first() == msg.author) {
                return msg.channel.send('You cannot give points to yourself.');
            } else if (isNaN(args[0])) {
                return msg.channel.send('First argument needs to be a number.');
            } else {
                amount = parseInt(args[0]);
                user = msg.mentions.users.first();
            }
        } else if (args.length == 1 && msg.mentions.users.size == 0) {
            return msg.channel.send('You need to specify a user.');
        } else if (args.length == 1 && msg.mentions.users.size == 1) {
            return msg.channel.send('You need to specify how much points you want to give.');
        } else {
            return msg.channel.send('Invalid arguments.');
        }

        let Points = models.Points;
        let author_document = await Points.findOne({userID: msg.author.id});

        if (author_document == null) {
            author_document = new models.Points({userID: msg.author.id, points: 0});
        }

        if (author_document.points - amount < 0) {
            await author_document.save();
            return msg.channel.send('You do not have enough points to give this amount.');
        }

        let user_document = await Points.findOne({userID: user.id});

        if (user_document == null) {
            user_document = new models.Points({userID: user.id, points: 0});
        }

        author_document.points -= amount;
        user_document.points += amount;

        await author_document.save();
        await user_document.save();

        msg.channel.send(`${msg.author} has given ${amount} points to ${user}.`);
    }
}