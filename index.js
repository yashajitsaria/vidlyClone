const express = require('express');
const app = express();
const home = require('./routes/home');
const genres = require("./routes/genres");
const customers = require('./routes/customers');
const users = require('./routes/users');
const mongoose = require('mongoose');
const auth = require('./routes/auth');

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

//connecting to port
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port: ${port}`) });