
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
var db;

MongoClient.connect('mongodb://tom.sellstrom:!Argosy123@ds121955.mlab.com:21955/tomtraining', (err, database) => {
    db = database;
  });

app.use(bodyParser.urlencoded({extended: true}));
// app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile("/Users/helpdesk/Documents/WEB_DESIGN/index.html");
    db.collection('quotes').find().toArray(function(err, results) {
        console.log(results);
        // res.render('index.ejs', {quotes: result});
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.redirect('/');
    });
});

app.listen(2000);