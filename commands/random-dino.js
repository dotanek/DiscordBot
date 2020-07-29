module.exports = {
    name: 'random-dino',
    description: "Picks a random dinosaur from 'The Isle'.",
    run: async (msg,args) => {

        if (msg.channel.guild.id != '690982329836896266') {
            return msg.channel.send('This command is dedicated to a diffrent discord server.');
        }

        let regex = /^\<\@\!?[0-9]*\>$/g;
        let user;
        let dinosaurs;
        let dinosaur;

        if (args.length == 0) {
            dinosaurs = carnivores.concat(herbivores);
            user = msg.author;
        } else if (args.length == 1) {
            if (args[0] == 'carnivore') {
                dinosaurs = carnivores;
                user = msg.author
            } else if (args[0] == 'herbivore') {
                dinosaurs = herbivores;
                user = msg.author;
            } else if (regex.test(args[0])) {
                dinosaurs = carnivores.concat(herbivores);
                user = msg.mentions.users.first();
            } else {
                msg.channel.send("Invalid arguments.");
                return;
            }
        } else if (args.length == 2 && regex.test(args[1])) {
            if (args[0] == 'carnivore') {
                dinosaurs = carnivores;
                user = msg.mentions.users.first();
            } else if (args[0] == 'herbivore') {
                dinosaurs = herbivores;
                user = msg.mentions.users.first();
            } else {
                msg.channel.send("Invalid arguments.");
                return;
            }
        }

        dinosaur = dinosaurs[Math.floor(Math.random() * dinosaurs.length)];

        if (dinosaur == 'Tyrannosaurus' || dinosaur == 'Giganotosaurus') {
            dinosaur = ((Math.floor(Math.random() * 4) == 3) ? "subadult " : "") + dinosaur;
        }
    
        if (dinosaur == 'Ceratosaurus') {
            dinosaur = ((Math.floor(Math.random() * 4) == 3) ? "full juvenile " : "") + dinosaur;
        }

        if (user == msg.author) {
            msg.reply(((msg.channel.type == 'dm') ? 'Your' : 'your') + ` dinosaur is ${dinosaur}.`);
        } else {
            msg.channel.send(`${user}, your dinosaur is ${dinosaur}.`);
        }
    }
}

const carnivores = [
    'Allosaurus',
    'Ceratosaurus',
    'Carnotaurus',
    'Dilophosaurus',
    'Giganotosaurus',
    'Suchomimus',
    'Utahraptor',
    'Tyrannosaurus'
];

const herbivores = [
    'Diabloceratops',
    'Dryosaurus',
    'Gallimimus',
    'Maiasaura',
    'Pachycephalosaurus',
    'Parasaurolophus',
    'Triceratops'
];
