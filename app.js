var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')


var index = require('./routes/index');


var app = express();

//connect to mongoDB DB
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/grit'
mongoose.connect(mongoDB);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/', index);

app.listen(3000, function () {
  console.log('BLOG is listening on port 3000!')
})

module.exports = app;
