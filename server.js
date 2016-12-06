var express = require('express');
var app = express();

app.use(express.static('public')); // serve public directory to clientgi


var recipes = [
        {
            recipe_name : "Chilli",
            meal_type : "Lunch/Dinner"
        },
        {
            recipe_name : "Omlette",
            meal_type : "Breakfast"
        },
        {
            recipe_name : "Grilled Cheese",
            meal_type : "Lunch"
        },
        {
            recipe_name : "Chicken Parmeasean",
            meal_type : "Dinner"
        }
];
app.get('/get-all-recipes', function(req, res) {
    res.send(recipes);
});

app.listen(3000, function() {
    console.log('up and running'); 
});