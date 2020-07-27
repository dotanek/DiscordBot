module.exports = {
    name: 'ping',
    description: 'Responds with "Pong!".',
    run: (msg,arg) => {
        msg.channel.send('Pong!');
    }
}