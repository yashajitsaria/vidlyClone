const express = require('express');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const config = require('config');
const auth = require('./middleware/auth');
const app = express();
const home = require('./routes/home');
const genres = require("./routes/genres");
const customers = require('./routes/customers');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());
// app.use(logger);
// app.use(auth);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(helmet());

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

// //Configuration
// console.log("Application Name: " + config.get('name'));
// console.log("Mail Server: " + config.get('mail.host'));
// console.log("Mail Password: " + config.get('mail.password'));

// if (app.get('env') === 'development') {
//     app.use(morgan('tiny'));
//     startupDebugger('Morgan Enabled...'); // console.log()
// }

// //Database work
// dbDebugger('Connected to the Database...');

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port: ${port}`) });