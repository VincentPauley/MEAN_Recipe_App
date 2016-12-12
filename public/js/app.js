

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
app.controller('createRecipeController', function($http) {
    this.current_ingredient = "";
    // var ingredients_list = 
    let ingredients = this.ingredients_list = {
        produce : [],
        dairy : [],
        meat : [],
        unknown : []
    };
    
    function findIngredientType(ingredient) {
        console.log('in find ingredient');
        
        var data = {"ingredient" : ingredient};
        $http({
            url : '/find-ingredient',
            method : 'POST',
            data: data
            
        })
        .success((response) => {
            console.log('SUCCESS');
            console.log(response);
            
            var ingredient_type = response;
            console.log(ingredients[ingredient_type]);
            // add to list
            
            if(ingredients[ingredient_type].indexOf(ingredient) < 0) {
                ingredients[ingredient_type].push(ingredient);
            }
            return response;
        }).error(() => {
            console.log('ERROR');
        });
    }   
    this.addIngredientToList = function(ingredient) {
        findIngredientType(ingredient);
        // don't allow duplicate ingredients - do this after selecting from the database so you know what key to check.
        /*
        if(ingredients_list.indexOf(ingredient) < 0) {
            ingredients_list.push(ingredient);   
        }
        */
        this.current_ingredient = "";
    }
});


