const Discord = require('discord.js');
const mongoose = require('../database/mongoose.js');
const models = require('../database/models.js')

module.exports = {
    name: 'kill-dino',
    description: 'Registers a dinosaur kill.',
    run: async (msg,args) => {

        if (msg.channel.guild.id != '690982329836896266') {
            return msg.channel.send('This command is dedicated to a diffrent discord server.');
        }

        if (args.length == 0) {
            let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('List of dinosaurs:')
            .setDescription(dinosaurs.map(d => d.name).join('\n'));


        return msg.channel.send(embed);

        } else if (args.length != 2) {
            return msg.channel.send('Invalid arguments.');
        }

        let killer = dinosaurs.find(d => d.name.toLowerCase().startsWith(args[0].toLowerCase()));
        let victim = dinosaurs.find(d => d.name.toLowerCase().startsWith(args[1].toLowerCase()));

        if (typeof killer == 'undefined') {
            return msg.channel.send(`Unrecognized killer dinosaur, type '.kill-dino' to see the list of dinosaurs.`);
        }

        if (typeof victim == 'undefined') {
            return msg.channel.send(`Unrecognized killed dinosaur, type '.kill-dino' to see the list of dinosaurs.`);
        }

        let exp = parseInt(victim.value * (victim.value / killer.value));

        if (mongoose.status() != 1){
            return msg.channel.send('The database is currently unavailable.');
        }

        let DinoLevels = models.DinoLevels;
        let document = await DinoLevels.findOne({userID: msg.author.id});

        if (document == null) {
            document = new DinoLevels({ userID:msg.author.id, level:1, experience:0 });
        } 

        let current_level = document.level;
        let next_level = exp_base * Math.pow(exp_step,current_level);
        
        //console.log(document);


        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${msg.author.username} has killed ${victim.name} as ${killer.name}.`)
            .setDescription(`This kill was worth ${exp} xp!`);

        msg.channel.send(embed);
    }
}

const dinosaurs = [
    { id: 1, name: 'Allosaurus', value: 100 },
    { id: 2, name: 'Ceratosaurus', value: 100 },
    { id: 3, name: 'Dilophosaurus', value: 100 },
    { id: 4, name: 'Giganotosaurus', value: 100 },
    { id: 5, name: 'Suchomimus', value: 100 },
    { id: 6, name: 'Utahraptor', value: 100 },
    { id: 7, name: 'Tyrannosaurus', value: 1000 },
    { id: 8, name: 'Diabloceratops', value: 100 },
    { id: 9, name: 'Dryosaurus', value: 100 },
    { id: 10, name: 'Gallimimus', value: 100 },
    { id: 11, name: 'Maiasaura', value: 100 },
    { id: 12, name: 'Pachycephalosaurus', value: 100 },
    { id: 13, name: 'Parasaurolophus', value: 100 },
    { id: 14, name: 'Triceratops', value: 100 }
];

const exp_base = 100;
const exp_step = 2;