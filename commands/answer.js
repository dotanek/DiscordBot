module.exports = {
    name: 'answer',
    description: 'Provides an anwser to previously asked question.',
    usage: '.anwser',
    run: (msg,args) => {
        msg.channel.send(responses[Math.floor(Math.random() * responses.length)]);
    }
}

const responses = [
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