const express = require('express');
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const error = require('./middleware/error');
const app = express();
const home = require('./routes/home');
const genres = require("./routes/genres");
const customers = require('./routes/customers');
const users = require('./routes/users');
const mongoose = require('mongoose');
const auth = require('./routes/auth');

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({db: "mongodb://localhost/vidly"}));

//loading the private key before the connection starts
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

//connecting to database
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());

//routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

//connecting to port
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port: ${port}`) });