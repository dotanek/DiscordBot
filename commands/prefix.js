const mongoose = require("mongoose");
const models = require('./models.js');

let servers_cache = [];

module.exports = {
    name: 'prefix',
    usage: '',
    description: 'Changes prefix for the bot commands.',
    run: async (msg,args) => {
        if (mongoose.connection.readyState != 1){
            return msg.channel.send('The database is currently unavailable.');
        }
        if (msg.channel.type == 'dm') {
            return msg.channel.send('You can not use this command in private messages.');
        }

        if (args.length != 1) {
            return msg.channel.send('Invalid arguments.');
        }

        let Prefixes = models.Prefixes;
        let document = await Prefixes.findOne({serverID: msg.channel.guild.id},(err) => {
            if (err) {
                return msg.channel.send('An error occured while operating on database.');
            }
        });

        document.prefix = args[0];
        await document.save(err => {
            if (err) {
                return msg.send('An error occured while operating on database.');
            }
        });

        let server = servers_cache.find(s => s.id == msg.channel.guild.id);

        if (typeof server != 'undefined') {
            server.prefix = args[0];
        } else {
            server_cache.push({id:msg.channel.guild.id,prefix:args[0]});
        }
        
        msg.channel.send(`Prefix successfully changed to **${document.prefix}**.`);
    },

    load: async (msg) => { 
        let server = servers_cache.find(s => s.id == msg.channel.guild.id);
    
        if (typeof server != 'undefined') {
            return server.prefix;
        } else {

            if (mongoose.connection.readyState != 1){
                return '!';
            }

            let Prefixes = models.Prefixes;
            let document = await Prefixes.findOne({serverID: msg.channel.guild.id});
            
            if(document == null) {
                document = new Prefixes({serverID: msg.channel.guild.id,serverName:msg.channel.guild.name,prefix:'!'});
                await document.save();
                servers_cache.push({id:msg.channel.guild.id,prefix:'!'});
                return '!';
                
            } else {
                servers_cache.push({id:msg.channel.guild.id,prefix:document.prefix});
                return document.prefix;;
            }
        }
    }
}