

var app = angular.module('app', ['ngRoute']);

// configure angular routes
app.config(function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl : 'templates/home.html',
        controller : 'userGreeting',
        controllerAs : 'greetCtrl'
    })
    .when('/create_new', {
        templateUrl : 'templates/create_new.html',
        controller : 'createRecipeController',
        controllerAs : 'newRecipeCtrl'
    })
    .when('/view_all', {
        templateUrl : 'templates/view_all.html',
        controller : 'viewRecipes',
        controllerAs : 'showCtrl'
    });
});


// Home Controllers
app.controller('userGreeting', function() {
    this.user = "Timothy";
});

// view recipes controller
app.controller('viewRecipes', function($http) {
    this.recipe_list = [{recipe_name : "no recipes loaded yet..."}];
    
    
    
    this.getAllRecipes = function() {
         $http.get('/find')
        .success((response) => {
            this.recipe_list = response;
             console.log(response);
        });
    }
});

// create recipe controller
app.controller('createRecipeController', function() {
    this.current_ingredient = "Jessie";
    var ingredients_list = this.ingredients_list = [];
    
    this.addIngredientToList = function(ingredient) {
        // don't allow duplicate ingredients
        if(ingredients_list.indexOf(ingredient) < 0) {
            ingredients_list.push(ingredient);   
        }
        this.current_ingredient = "";
    }
});


