var app = angular.module('app', []);


app.controller('showAllRecipes', function() {
    this.test = "Lucy";
    
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
    this.recipe_list = recipes;
});