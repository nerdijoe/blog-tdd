var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var blogs = require('./routes/blogs');



var app = express();

// mongoose setup *************************
//connect to mongoDB DB
var mongoose = require('mongoose');

var db_config = {
  development: 'mongodb://localhost/h8_w07d01_01_blogtdd_dev',
  test: 'mongodb://localhost/h8_w07d01_01_blogtdd_test'
}

var app_env = app.settings.env
console.log('mongoose here');

// var mongoDB = 'mongodb://127.0.0.1/'
mongoose.connect(db_config[app_env], (err,res) => {
  console.log('Connected to Database: ' + db_config[app_env] );
});


// mongoose setup end *************************

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/', index);
app.use('/api/blogs', blogs);

app.listen(3000, function () {
  console.log('BLOG is listening on port 3000!')
})

module.exports = app;
