// ---------------------- Main imports ---------------------- //

const Discord = require('discord.js');
const mongoose = require('./mongoose.js');
const prefix = require('./prefix.js');


// ---------------------- Command imports ---------------------- //

const ping = require('./ping.js');
const count = require('./count.js');
const isRight = require('./is-right.js');
const image = require('./image.js');
const randomDino = require('./random-dino.js');
const points = require('./points.js');
const give = require('./give.js');
const kill = require('./kill.js');

const runnables = [ping,count,isRight,image,randomDino,/*points,give,*/prefix,kill];

// ---------------------- Discord ---------------------- //

const client = new Discord.Client();
const token = 'REPLACE WITH ENV';

// ---------------------- Ready ---------------------- //

client.on('ready', () => {
    console.log('Bot is online.');
    client.user.setActivity('Healthy!',{type:'WATCHING'});
});

// ---------------------- Message ---------------------- //

client.on('message', async msg => {

    if (msg.author.bot) {
        return;
    }

    let server_prefix = '!';

    if (typeof msg.channel.guild != 'undefined') {
        server_prefix = await prefix.load(msg);
    }

    if (msg.content.startsWith(server_prefix)) {
        let args = msg.content.substr(server_prefix.length).split(' ');
        let command = args.shift();
        let runnable = runnables.find(r => r.name == command);

        if (typeof runnable != 'undefined') {
            runnable.run(msg,args);
        } else {
            console.log('Unrecognized command.');
        }
    } else if (typeof msg.channel.guild != 'undefined' && (/^\<\@\!?[0-9]*\>$/g).test(msg.content) && msg.mentions.users.first() == client.user) {
        msg.channel.send(`My prefix in this server is **${server_prefix}**`);
    }
});

// ---------------------- Login ---------------------- //

mongoose.init(client);
client.login(token);