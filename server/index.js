const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app =express();
app.set('port', (process.env.PORT || 4000));
var promise = mongoose.connect('mongodb://localhost/poll', {
  useMongoClient: true,
  /* other options */
});
mongoose.Promise = global.Promise;

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

//init app
//build part of the react app
//uncoment this after npm build
/*app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
*/
//err
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message})
});

//port
app.listen(app.get('port'), function () {
    console.log('App listening on port ' + app.get('port'));
});
