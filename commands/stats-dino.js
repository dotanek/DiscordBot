const Discord = require('discord.js');
const mongoose = require('../database/mongoose.js');
const models = require('../database/models.js')

module.exports = {
    name: 'stats-dino',
    description: 'Shows your kill statistics.',
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

        let DinoKills = models.DinoKills;
        let documents = await DinoKills.find({ userID:user.id });
        
        if (documents.length == 0) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`${user.username} kill statistics.`)
                .setDescription(`No registered kills.`);

            return msg.channel.send(embed);
        }

        let kills_target = {};
        let kills_killer = {};
        
        documents.forEach(d => {
            kills_target[d.victim] = (kills_target[d.victim] || 0) + 1;
            kills_killer[d.killer] = (kills_killer[d.killer] || 0) + 1;
        });

        let embed = new Discord.MessageEmbed()
            .setTitle(`${user.username} kill statistics.`)
            .addField('Killed dinosaurs:', Object.entries(kills_target).map(k => `${k[0]}: ${k[1]}`).join('\n'))
            .addField('Kills as dinosaur:', Object.entries(kills_killer).map(k => `${k[0]}: ${k[1]}`).join('\n'));

        msg.channel.send(embed);
    }
}