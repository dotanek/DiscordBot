const mongoose = require('mongoose');
const models = require('./models.js')

module.exports = {
    init: async (client,db_password) => { 
        mongoose.connect(`mongodb+srv://Dotbot:${db_password}@cluster.5axtm.gcp.mongodb.net/dotbot-database`,db_options, err => {
            if (err) {
                console.log(err);
            }
        });
        mongoose.client = client;
        models.init();
    },

    status: () => {
        return mongoose.connection.readyState;
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