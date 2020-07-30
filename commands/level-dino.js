const Discord = require('discord.js');
const mongoose = require('../database/mongoose.js');
const models = require('../database/models.js')

module.exports = {
    name: 'level-dino',
    description: 'Shows your current level and xp.',
    run: async (msg,args) => {

        if (mongoose.status() != 1){
            return msg.channel.send('The database is currently unavailable.');
        }

        let user;

        if (args.length == 0) {
            user = msg.author;
        } else if (msg.mentions.users.size != 0) {
            user = msg.mentions.users.first();
        } 

        let DinoLevels = models.DinoLevels;
        let document = await DinoLevels.findOne({ userID:user.id });
        
        if (document == null) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${user.username} is level 0.`)
                .setDescription('Needs to register at least one kill to level up.');

            return msg.channel.send(embed);
        }

        let embed = new Discord.MessageEmbed()
                .setTitle(`${user.username} is level ${document.level}.`)
                .setDescription(`Currently ${exp_base * Math.pow(exp_step,document.level) - document.experience} xp away from leveling up.`);

        msg.channel.send(embed);
    }
}

const exp_base = 100;
const exp_step = 2;