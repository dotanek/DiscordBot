module.exports = {
    name: 'ping',
    usage: '.ping',
    description: 'Responds with "Pong!".',
    run: (msg,arg) => {
        msg.channel.send('Pong!');
    }
}