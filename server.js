const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const aws = require('aws-sdk')

connectDB();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.set('views', './views');
app.use(express.json({ extended: false }));
// app.use('/images', express.static(path.join(__dirname, 'images')));
app.engine('html', require('ejs').renderFile)

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/films', require('./routes/api/films'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/showtimes', require('./routes/api/showtimes'));
app.use('/api/bookings', require('./routes/api/bookings'));
app.use('/api/sign-s3', require('./routes/api/sign-s3'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

aws.config.region = 'eu-west-3';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
