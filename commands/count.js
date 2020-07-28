module.exports = {
    name: 'count',
    description: 'Counts the amount of messages containing given word.',
    run: async (msg,args) => {

        let regex = /\<\@\!?[0-9]*\>/g;
        let keyword;
        let user;

        if (args.length == 1) {
            keyword = args[0].toLowerCase();
            user = msg.author;
        } else if (args.length == 2 && regex.test(args[1])) {
            keyword = args[0].toLowerCase();
            user = msg.mentions.users.first();
        } else {
            msg.channel.send('Invalid arguments.');
            return;
        }
    
        let counter = 0;
        let options = {limit:100,before:msg.id};
        let batch;
    
        do {
            batch = await msg.channel.messages.fetch(options);
            options.before = batch.last().id;
    
            batch.forEach(m => {
                if (m.author == user && m.content.toLowerCase().includes(keyword)) {
                    counter++;
                }
            });
    
        } while (batch.size == 100);

        if (user == msg.author) {
            msg.reply(((msg.channel.type == 'dm') ? "You" : "you") + ` have used the word **${keyword}** in ${counter} ` + ((counter == 1) ? `message` : 'messages') + ` in this channel.`);
        } else {
            msg.channel.send( `${user} has used the word **${keyword}** in ${counter} ` + ((counter == 1) ? `message` : 'messages') + ` in this channel.`);
        }
    }
}