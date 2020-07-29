// ---------------------- Main imports ---------------------- //

const Discord = require('discord.js');
const mongoose = require('./database/mongoose.js');
const dotenv = require("dotenv")
dotenv.config()

// ---------------------- Command imports ---------------------- //

const ping = require('./commands/ping.js');
const count = require('./commands/count.js');
const answer = require('./commands/answer.js');
const image = require('./commands/image.js');
//const points = require('./points.js');
//const give = require('./give.js');

// ---------------------- 'Dino train' server dedicated commands ---------------------- //

const killDino = require('./commands/kill-dino.js');
const randomDino = require('./commands/random-dino.js');

const help = {
    name: 'help',
    description: 'Shows commands and details about them.',
    usage:'.help [optional - command]',
    run: (msg,args) => {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff');

        if (args.length == 1) {
            let cmd = runnables.find(r => r.name == args);

            if (typeof cmd == 'undefined') {
                return msg.channel.send('Unrecognized command.');
            }

            embed
                .setTitle(`Command '${cmd.name}'`)
                .addFields({name:'Description',value:cmd.description},{name:'Usage',value:cmd.usage});

        } else {
            let fields = runnables.map(c => c = {name:c.name,value:c.description});
            embed
                .setTitle('DotBot commands')
                .addFields(fields)
                .setFooter('Type ".help <command>" for details.');
        }

        msg.channel.send(embed);
    }
}

const runnables = [ping,count,answer,image,help,killDino,randomDino];

// ---------------------- Discord ---------------------- //

const client = new Discord.Client();
const token = process.env.token || process.env.local_token;
const prefix = '.';

// ---------------------- Mongoose ---------------------- //

const db_password = process.env.dbpassword || process.env.local_dbpassword;

// ---------------------- Ready ---------------------- //

client.on('ready', () => {
    console.log('Bot is online.');
    client.user.setActivity('Healthy! | Prefix "."',{type:'WATCHING'});
});

// ---------------------- Message ---------------------- //

client.on('message', async msg => {

    if (msg.author.bot) {
        return;
    }

    if (msg.content.startsWith(prefix)) {
        let args = msg.content.substr(prefix.length).split(' ');
        let command = args.shift();

        /*let runnable = runnables.find(r => r.name == command);

        if (typeof runnable != 'undefined') {
            runnable.run(msg,args);
        } else {
            console.log('Unrecognized command.');
        }*/

        switch(command) {
            case 'ping': ping.run(msg,args); break;
            case 'count': count.run(msg,args); break;
            case 'answer': answer.run(msg,args); break;
            case 'image': image.run(msg,args); break;
            case 'help': help.run(msg,args); break;
            case 'kill-dino': killDino.run(msg,args); break;
            case 'random-dino': randomDino.run(msg,args); break;
        }
    }
});

// ---------------------- Login ---------------------- //

mongoose.init(client,db_password);
client.login(token);