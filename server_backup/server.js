const express = require('express');
const mongoose = require('mongoose');
//const path = require('path');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/users/admin', require('./routes/api/users/admin'));
app.use('/api/users/enseignant', require('./routes/api/users/enseignant'));
app.use('/api/users/etudiant', require('./routes/api/users/etudiant'));
app.use('/api/auth', require('./routes/api/auth'));

/*// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}*/

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));