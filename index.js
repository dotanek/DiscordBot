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
const dino = require('./commands/dino.js');
const help = require('./commands/help.js');

const givegun = require('./commands/give-gun.js');
const kekpoint = require('./commands/kekpoint.js');

const runnables = [ping,count,answer,image,dino,help,kekpoint,givegun];

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

        switch(command) {
            case 'ping': ping.run(msg,args); break;
            case 'count': count.run(msg,args); break;
            case 'answer': answer.run(msg,args); break;
            case 'image': image.run(msg,args); break;
            case 'help': help.run(msg,args,runnables); break;
            case 'dino': dino.run(msg,args); break;
            //case 'kekpoint': kekpoint.run(msg,args); break;
            //case 'give-gun': givegun.run(msg,args); break;
        }
    }
});

// ---------------------- Login ---------------------- //

mongoose.init(client,db_password);
client.login(token);



/*let runnable = runnables.find(r => r.name == command);

if (typeof runnable != 'undefined') {
    runnable.run(msg,args);
} else {
    console.log('Unrecognized command.');
}*/