module.exports = {
    name: 'anwser',
    description: 'Counts the amount of messages containing given word.',
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