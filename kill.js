const { createPool } = require("mysql");

module.exports = {
    name: 'kill',
    description: 'Registers a kill.',
    run: async (msg,args) => {
        let killer;
        let victim;

        let str_dinos =  'Type number to select **your** dinosaur:\n' + '```' + dinosaurs.map(e => `${e.id}: ${e.name}`).join('\n') + '```';

        bot_msg = await msg.channel.send(str_dinos);

        let filter = m => {
            return m.author == msg.author && parseInt(m.content) > 0 && parseInt(m.content) < 15;
        }

        let options = {max:1, time:30000};

        let collected = await msg.channel.awaitMessages(filter,options);

        if (collected.size == 0) {
            return bot_msg.edit('```Command timed out.```');
        }

        let m = collected.first();
        killer = dinosaurs.find(d => d.id == parseInt(m.content));

        str_dinos = str_dinos.replace('your','killed');
        str_dinos =  `Your dino: **${killer.name}**\n` + str_dinos;
        await bot_msg.edit(str_dinos);

        collected = await msg.channel.awaitMessages(filter,options);

        if (collected.size == 0) {
            return bot_msg.edit('```Command timed out.```');
        }

        m = collected.first();
        victim = dinosaurs.find(d => d.id == parseInt(m.content));

        
        str_dinos = str_dinos.substr()
        str_dinos =  `Your dino: **${killer.name}**\nKilled dino: **${victim.name}**` + '```' + dinosaurs.map(e => `${e.id}: ${e.name}`).join('\n') + '```';
        await bot_msg.edit(str_dinos);
        str_dinos = `**${msg.author}** has killed **${victim.name}** as **${killer.name}**.`;
        await msg.channel.send(str_dinos);
    }
}

const dinosaurs = [
    { id: 1, name: 'Allosaurus', value: 100 },
    { id: 2, name: 'Ceratosaurus', value: 100 },
    { id: 3, name: 'Dilophosaurus', value: 100 },
    { id: 4, name: 'Giganotosaurus', value: 100 },
    { id: 5, name: 'Suchomimus', value: 100 },
    { id: 6, name: 'Utahraptor', value: 100 },
    { id: 7, name: 'Tyrannosaurus', value: 100 },
    { id: 8, name: 'Diabloceratops', value: 100 },
    { id: 9, name: 'Dryosaurus', value: 100 },
    { id: 10, name: 'Gallimimus', value: 100 },
    { id: 11, name: 'Maiasaura', value: 100 },
    { id: 12, name: 'Pachycephalosaurus', value: 100 },
    { id: 13, name: 'Parasaurolophus', value: 100 },
    { id: 14, name: 'Triceratops', value: 100 }
];