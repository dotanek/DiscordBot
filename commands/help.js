const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Shows commands and details about them.',
    usage:'.help [optional - command]',
    run: (msg,args,runnables) => {
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
                setFooter(`Type '.help <command>'' for details.`);
        }

        msg.channel.send(embed);
    }
}
