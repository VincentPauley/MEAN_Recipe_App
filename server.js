var express = require('express');
var app = express();
var mongodb = require('mongodb');
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(express.static('public')); // serve public directory to clientgi


app.get('/find', function(req, res) {
    var MongoClient = mongodb.MongoClient;
    var query = req.param('query');
    console.log(query);
    MongoClient.connect('mongodb://localhost:27017/recipes', function(err, db) {
        if(err) {
           console.log('there was an error: ' + err);
        } else {
            // console.log('Connection established to: ' + url);
            var collection = db.collection('recipes');

            collection.find({}).toArray(function(err, result) {
                if(err) {
                    console.log(err);
                } else if(result.length) {
                    res.send(result);
                } else {
                    console.log('nothing found');
                }
            });
        }
    });
});

app.post('/find-ingredient', function(req, res) {
    var MongoClient = mongodb.MongoClient;

    var ingredient = req.body.ingredient;
    MongoClient.connect('mongodb://localhost:27017/recipes', function(err, db) {
        if(err) {
            console.log('there was an error: ' + err);
        } else {
            var collection = db.collection('ingredients');
            
            collection.find({name : ingredient}, {type : 1, _id : 0}).toArray(function(err, result) {
                if(err) {
                    console.log(err);
                } else if(result.length) {
                    res.send(result[0].type);
                } else {
                    console.log('nothing found');
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log('up and running'); 
});