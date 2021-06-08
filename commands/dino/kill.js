const Discord = require('discord.js');
const mongoose = require('../../database/mongoose.js');
const models = require('../../database/models.js')

module.exports = {
    name: 'kill',
    description: 'Registers a dinosaur kill.',
    run: async (msg,args) => {

        if (args.length == 0) {
            let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('List of dinosaurs:')
            .setDescription(dinosaurs.map(d => d.name).join('\n'));

            return msg.channel.send(embed);

        } else if (args.length < 2) {
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

        let DinoKills = models.DinoKills;
        let DinoLevels = models.DinoLevels;

        let document_kills = new DinoKills({
            userID:msg.author.id,
            userName:msg.author.username,
            killer:killer.name,
            victim:victim.name,
            comment: args.slice(2).join(' ')
        });
        
        let document_levels = await DinoLevels.findOne({ userID:msg.author.id });
        let level_up = false;

        if (document_levels == null) {
            document_levels = new DinoLevels({
                userID:msg.author.id,
                userName:msg.author.username,
                level:1, experience:0
            });
            level_up = true;
        }

        let current_level = document_levels.level;
        let current_exp = document_levels.experience + exp;
        let next_level = exp_base * Math.pow(exp_step,current_level);

        while (current_exp >= next_level) {
            current_level++;
            current_exp -= next_level;
            next_level = exp_base * Math.pow(exp_step,current_level);
            level_up = true;
        }

        document_levels.level = current_level;
        document_levels.experience = current_exp;

        await document_levels.save(err => {
            if (err) {
                return msg.channel.send('An error occured while operating on database.');
            }

            document_kills.save();

            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${msg.author.username} has killed ${victim.name} as ${killer.name}.`)
                .setDescription(`This kill was worth ${exp} xp!`);

            msg.channel.send(embed);
            
            if (level_up) {
                embed
                    .setColor('#0099ff')
                    .setTitle(`Level up!`)
                    .setDescription(`${msg.author} is now at level ${current_level}.`)

                msg.channel.send(embed);
            }
        });

        return;
    }
}

const dinosaurs = [
    { name: '\n**Herbivores**,', value: 0 },
    { name: 'Gallimimus', value: 30 },
    { name: 'Pachycephalosaurus', value: 30 },
    { name: 'Maiasaura', value: 40 },
    { name: 'Diabloceratops', value: 50 },
    { name: 'Parasaurolophus', value: 50 },
    { name: 'SubTriceratops', value: 50 },
    { name: 'Stegosaurus', value: 70 },
    { name: 'Ankylosaurus', value: 70 },
    { name: 'Therizinosaur', value: 90 },
    { name: 'Triceratops', value: 90 },
    { name: 'Shantungosaurus', value: 100 },
    { name: 'Camarasaurus', value: 100 },
    { name: '\n**Carnivores**,', value: 0 },
    { name: 'Herrerasaurus', value: 10 },
    { name: 'Austroraptor', value: 10 },
    { name: 'Utahraptor', value: 30 },
    { name: 'Dilophosaurus', value: 30 },
    { name: 'Baryonyx', value: 30 },
    { name: 'JuvCeratosaurus', value: 30 },
    { name: 'Ceratosaurus', value: 40 },
    { name: 'Carnotaurus', value: 40 },
    { name: 'Allosaurus', value: 50 },
    { name: 'Albertosaurus', value: 50 },
    { name: 'Suchomimus', value: 50 },
    { name: 'SubTyrannosaurus', value: 50 },
    { name: 'SubGiganotosaurus', value: 50 },
    { name: 'Acrosaurus', value: 70 },
    { name: 'Tyrannosaurus', value: 90 },
    { name: 'Giganotosaurus', value: 90 },
    { name: 'Spinosaurus', value: 100 },
];

const exp_base = 100;
const exp_step = 2;