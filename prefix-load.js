const mongoose = require('mongoose');
const models = require('./models.js');

let prefix_cache = [];

module.exports = {
    load: async (msg) => { 

        console.log(prefix_cache);

        if (typeof msg.channel.guild == 'undefined') {
            return '!';
        }

        let server = prefix_cache.find(p => p.id == msg.channel.guild.id);
    
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
                prefix_cache.push({id:msg.channel.guild.id,prefix:'!'});
                return '!';
                
            } else {
                prefix_cache.push({id:msg.channel.guild.id,prefix:document.prefix});
                return document.prefix;;
            }
        }
    }
}
