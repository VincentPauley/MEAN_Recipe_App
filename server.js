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
                } else {
                    res.send(result);
                }
            });
        }
    });
});
/*
 * find-ingredient
 * 
 * expects a string (ingredient) and returns what type of ingredient it is
 * if it exists in the ingredients collection.
 * 
 * Parameters: 
 *
 *  expects json, where value is a string (the ingredient)
 *
 * Returns: object.
 */
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
                    res.send('there was an error');
                } else {
                    res.send(result);
                }
            });
        }
    });
});
/*
 *
 */
app.post('/add-ingredient', function(req, res) {
    var MongoClient = mongodb.MongoClient;
    console.log('Add Ingredient');
    var potential_ingredient = req.body.potential_ingredient;
    
    MongoClient.connect('mongodb://localhost:27017/recipes', function(err, db) {
        if(err) {
            console.log('there was an error attempting to connect: ' + err);
        } else {
            // verify ingredient is not already in the database
            var collection = db.collection('ingredients');
            
            collection.find({name : potential_ingredient}).toArray(function(err, result) {
                if(err) {
                    console.log(err);
                } else {
                    if(result.length) {
                        console.log('result was found');
                        console.log(result)
                    } else {
                        console.log('no match found');
                        collection.insertOne({name : potential_ingredient, type : 'meat'});
                    }
                }
            }); 
        }
    });
});

app.get('/ingredient-categories', function(req, res) {
   var MongoClient = mongodb.MongoClient;
   console.log('ingredient categories function');
    
   MongoClient.connect('mongodb://localhost:27017/recipes', function(err, db) {
       if(err) {
           console.log('there was an error attempthing to connect');
       }
   });
});


app.listen(3000, function() {
    console.log('up and running'); 
});