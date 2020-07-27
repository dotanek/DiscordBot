// ---------------------- Main imports ---------------------- //

const Discord = require('discord.js');
const mongoose = require('./database/mongoose.js');

// ---------------------- Command imports ---------------------- //

const ping = require('./commands/ping.js');
const count = require('./commands/count.js');
const anwser = require('./commands/anwser.js');
const image = require('./commands/image.js');
//const points = require('./points.js');
//const give = require('./give.js');


const runnables = [ping,count,anwser,image];

// ---------------------- Discord ---------------------- //

const client = new Discord.Client();
const token = 'NzI3NTE0Njc3OTg2NDU5NzU4.XxXqwQ.N6BkEvJYsVXUudJdVPVzUPWZLGg';
const prefix = '.';

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
        let runnable = runnables.find(r => r.name == command);

        if (typeof runnable != 'undefined') {
            runnable.run(msg,args);
        } else {
            console.log('Unrecognized command.');
        }
    }
});

// ---------------------- Login ---------------------- //

mongoose.init(client);
client.login(token);