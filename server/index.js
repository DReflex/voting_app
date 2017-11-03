const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app =express();
app.set('port', (process.env.PORT || 8080));
var mlab = "mongodb://voting:password@ds245715.mlab.com:45715/voting_app"
var options={
  user: "voting",
  pass: "password"
}
var promise = mongoose.connect(mlab,{
  useMongoClient: true
  /* other options */
});
mongoose.Promise = global.Promise;

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

//init app
//build part of the react app
//uncoment this after npm build
app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

//err
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message})
});

//port
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});
