//Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;
const config = require('./db/config');
var routes = require('./routes/routes');

mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//When Connection is Open
db.once('open', function () {
    console.log('MONGODB Connection Open at ' + config.DB);
});

//Check DB for error
db.on('error', function (err) {
    console.log("Error is: " + err.stack);
})

//Configure Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//Use External Routes
app.use('/', routes);

//Start the Server
app.listen(PORT, function() {
    console.log('Server Started at PORT: ' + PORT);
});