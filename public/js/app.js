

var app = angular.module('app', []);

// get-all-recipes

app.controller('showAllRecipes', function($http) {
    this.test = "Lucy";
    
    this.recipe_list = [{recipe_name : "no recipes loaded yet..."}];
    
    
    
    this.getAllRecipes = function() {
         $http.get('/get-all-recipes')
        .success((response) => {
            this.recipe_list = response;
        });
    }
});

