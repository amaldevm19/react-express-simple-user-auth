var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressSimpleUserAuthApi', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", ()=>{
    console.log("Database connected")
})

module.exports = db;