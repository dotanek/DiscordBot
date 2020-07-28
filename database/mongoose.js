const mongoose = require('mongoose');
const models = require('./models.js')

module.exports = {
    init: async (client) => { 
        mongoose.connect(`mongodb+srv://Dotbot:${process.env.dbpassword}@cluster.5axtm.gcp.mongodb.net/dotbot-database`,db_options, err => {
            if (err) {
                console.log(err);
            }
        });
        mongoose.client = client;
        models.init();
    }
}

mongoose.connection.on('connected', () => {
    console.log('Connected to database.');
});

mongoose.connection.on('err', err => {
    console.log(`An error occured during database connection: ${err.stack}`);
    mongoose.client.user.setActivity('Database issues.',{type:'WATCHING'});
});

mongoose.connection.on('disconnected', err => {
    console.log('Disconnected from database.');
    mongoose.client.user.setActivity('Database issues.',{type:'WATCHING'});
});

let db_options= {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    connectTimeoutMS: 10000,
    family: 4
};