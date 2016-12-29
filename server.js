var express = require('express');
var app = express();
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var bodyParser = require('body-parser');
var port = 8080;
// models
var Ingredient = require('./Ingredient.model');

app.use(bodyParser.json());

app.use(express.static('public')); // serve public directory to clientgi

var db = 'mongodb://localhost/cookhook';
mongoose.connect(db);





/*
 * Add Ingredient
 *
 * reads URL params for new ingredient and uses mongoose to create a model of the
 * ingredient to the database and then saves a new document for it.
 *
 * Parameters
 *
 *    potential_ingredient, (STRING) -> name of new ingredient
 *    ingredient_type, (STRING) -> category of new ingredient
 *
 * Returns:
 *
 */
app.post('/add-ingredient', function(req, res) {
    var potential_ingredient = req.body.potential_ingredient;
    var ingredient_type = req.body.ingredient_type;

    var newIngredient = new Ingredient(); // <-- called from model

    newIngredient.name = potential_ingredient;
    newIngredient.category = ingredient_type;

    newIngredient.save(function(err, Ingredient) {
        if(err) {
            console.log(err);
        } else {
            console.log('SUCCESS');
            console.log(Ingredient);
        }
    });
});

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

// TODO: in the fe, call this route to create form options for the type of ingredient !!!
app.get('/ingredient-categories', function(req, res) {
   var MongoClient = mongodb.MongoClient;

   MongoClient.connect('mongodb://localhost:27017/recipes', function(err, db) {
       if(err) {
           console.log('there was an error attempthing to connect: ' + err);
       } else {
           var collection = db.collection('ingredients');

           collection.distinct("type", function(err, result) {
                if(err) {
                    console.log('there was an error: ' + err);
                } else {
                    res.send(result);
                }
           });
       }
   });
});


app.listen(port, function() {
    console.log('server running on port: ' + port);
});
