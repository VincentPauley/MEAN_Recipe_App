var express = require('express');
var app = express();
var mongodb = require('mongodb');

app.use(express.static('public')); // serve public directory to clientgi


app.get('/find', function(req, res) {
    var MongoClient = mongodb.MongoClient;
    var query = req.param('query');
    console.log(query);
    MongoClient.connect('mongodb://localhost:27017/recipes', function(err, db) {
        if(err) {
           // console.log('there was an error: ' + err);
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

app.listen(3000, function() {
    console.log('up and running'); 
});