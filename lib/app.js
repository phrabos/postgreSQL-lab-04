const express = require('express');
const app = express();


app.use(express.json());

app.use('/api/v1/teas', require('./controller/teas'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));
app.use(express.urlencoded({ extended: false }));

module.exports = app;
