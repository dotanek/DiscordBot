module.exports = {
    name: 'is-right',
    description: 'Counts the amount of messages containing given word.',
    run: (msg,args) => {

        if (typeof args[0] == 'undefined' || msg.mentions.users.size != 1) {
            msg.reply((msg.channel.type == 'dm') ? 'Who?' : 'who?');
            return;
        }

        const responses = (msg.mentions.users.first().id == '338469246751342593' ? flamey_responses : standard_responses);
        let response = responses[Math.floor(Math.random() * responses.length)];
        msg.channel.send(response);
    }
}

const flamey_responses = [
    'Absolutely not.',
    'Hell naww!',
    'I do not think so.',
    'Not really.',
    'No.',
    'Nope.',
    'Nein.',
    'Nie.',
    'Nope.',
    'Obviously not.',
    'Completely wrong.',
    'Intensively not.',
    'NOOOO.',
    'Nej.'
];

const standard_responses = [
    "Definetly yes.",
    'Yes.',
    'I think so.',
    'A little bit.',
    'Kinda.',
    'Maybe.',
    'I do not think so.',
    'Most likely not.',
    'No.',
    "Absolutly not."
];