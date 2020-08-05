const Discord = require('discord.js');
const mongoose = require('../../database/mongoose.js');
const models = require('../../database/models.js');

module.exports = {
    name: 'stats',
    description: 'Shows your kill statistics.',
    run: async (msg,args) => {

        if (mongoose.status() != 1){
            return msg.channel.send('The database is currently unavailable.');
        }

        let regex = /^\<\@\!?[0-9]*\>$/g;
        let user;
        let dino;

        if (args.length === 0) {
            user = msg.author;
        } else if (args.length === 1 && msg.mentions.users.size === 0) {
            if (msg.mentions.users.size === 0) {
                user = msg.author;
                dino = args[0];
            } else {
                user = msg.mentions.users.first();
            }
        } else {
            if (msg.mentions.users.size === 0) {
                user = msg.author;
                dino = args[0];
            } else {
                user = msg.mentions.users.first();
                if (!regex.test(args[0])) {
                    dino = args[0];
                }
            }
        }

        if (typeof dino === 'undefined') {
            return general(msg,user);
        }

        return details(msg,user,dino);
    }
}

const general = async (msg,user) => {
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
        .addField('Killed dinosaurs:', Object.entries(kills_target).sort(compare).map(k => `${k[0]}: ${k[1]}`).join('\n'))
        .addField('Kills as dinosaur:', Object.entries(kills_killer).sort(compare).map(k => `${k[0]}: ${k[1]}`).join('\n'))
        .addField('Total kills:', Object.entries(kills_target).map(k => k[1]).reduce((k,sum=0) => k + sum));

    msg.channel.send(embed);
}

const details = async (msg,user,dino) => {

    let actualDino = dinosaurs.find(d => d.name.toLowerCase().startsWith(dino.toLowerCase())).name;
    
    if (typeof actualDino === 'undefined') {
        return msg.channel.send(new Discord.MessageEmbed()
            .setDescription(`Unrecognized dinosaur '${dino}'.`));
    }

    let DinoKills = models.DinoKills;
    let documents = await DinoKills.find({ userID:user.id });

    if (documents.length == 0) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username} ${actualDino} kill statistics.`)
            .setDescription(`No kills found for ${actualDino}.`);

        return msg.channel.send(embed);
    }

    let kills = {};
        
    documents.forEach(d => {
       if (d.killer.toLowerCase().startsWith(dino.toLowerCase())) {
           kills[d.victim] = (kills[d.victim] || 0) + 1;
       }
    });

    const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username} ${actualDino} kill statistics.`)
        .addField('Killed dinosaurs:', Object.entries(kills).sort(compare).map(k => `${k[0]}: ${k[1]}`).join('\n'))
        .addField('Total kills:', Object.entries(kills).map(k => k[1]).reduce((k,sum=0) => k + sum));

    msg.channel.send(embed);
}

const compare = (a,b) => { return b[1] - a[1] };

const dinosaurs = [
    {name: '\n**Herbivores**,', value: 0 },
    {name: 'Gallimimus', value: 30 },
    {name: 'Pachycephalosaurus', value: 30 },
    {name: 'Maiasaura', value: 40 },
    {name: 'Diabloceratops', value: 50 },
    {name: 'Parasaurolophus', value: 50 },
    {name: 'Stegosaurus', value: 70 },
    {name: 'Ankylosaurus', value: 70 },
    {name: 'Therizinosaur', value: 90 },
    {name: 'Triceratops', value: 90 },
    {name: 'Shantungosaurus', value: 90 },
    {name: 'Camarasaurus', value: 100 },
    {name: '\n**Carnivores**,', value: 0 },
    {name: 'Herrerasaurus', value: 10 },
    {name: 'Austroraptor', value: 10 },
    {name: 'Utahraptor', value: 30 },
    {name: 'Dilophosaurus', value: 30 },
    {name: 'Baryonyx', value: 30 },
    {name: 'JuvCeratosaurus', value: 30 },
    {name: 'Ceratosaurus', value: 40 },
    {name: 'Carnotaurus', value: 40 },
    {name: 'Allosaurus', value: 50 },
    {name: 'Albertosaurus', value: 50 },
    {name: 'Suchomimus', value: 50 },
    {name: 'SubTyrannosaurus', value: 50 },
    {name: 'SubGiganotosaurus', value: 50 },
    {name: 'Acrosaurus', value: 70 },
    {name: 'Tyrannosaurus', value: 90 },
    {name: 'Giganotosaurus', value: 90 },
    {name: 'Spinosaurus', value: 100 },
];