const Discord = require('discord.js');
const kill = require('./dino/kill.js');
const random = require('./dino/random.js');
const level = require('./dino/level.js');
const stats = require('./dino/stats.js');

module.exports = {
    name: 'dino (dedicated)',
    description: "Contains all 'Dino train' server dedicated commands.",
    run: async (msg,args) => {

        if (msg.channel.guild.id != '690982329836896266') {
            return msg.channel.send('This command is dedicated to a diffrent discord server.');
        }

        if (args.length === 0) {
            
            let fields = runnables.map(c => c = {name:c.name,value:c.description});

            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Dino commands')
                .addFields(fields)
                .setFooter(`To use command type '.dino <command>'.`);
            
            return msg.channel.send(embed);
        }

        let command = args.shift();

        switch(command) {
            case 'kill': kill.run(msg,args); break;
            case 'random': random.run(msg,args); break;
            case 'level': level.run(msg,args); break;
            case 'stats': stats.run(msg,args); break;
            default: 
                msg.channel.send(new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(`Unrecognized dino command, type '.dino' for the list of dino commands.`))
            break;
        }
    }
}

const runnables = [kill,random,level,stats];
