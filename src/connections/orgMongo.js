const mongoose =require('mongoose')

const connectToDb = () =>{
    const dbHost = 'mongodb://localhost/'
    const dbName = 'movie'
    const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true }
    mongoose.connect(`${dbHost}${dbName}`, connectionOptions);

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('We are connected')
    });


}
module.exports = connectToDb

