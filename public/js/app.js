

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
    })
    .when('/add_ingredients', {
        templateUrl : 'templates/add_ingredients.html',
        controller : 'addIngredients',
        controllerAs : 'addCtrl'
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

/* Finally onto something here, always bind 'this' to a variable so you don't have context issues
inside of promises etc. */
app.controller('addIngredients', function($http) {
    var vm = this;
    vm.potential_ingredient = "";
    vm.ingedient_category = "Select Type";
    
    vm.add_ingredient = function() {
        $http({
            url : '/add-ingredient',
            method : 'POST',
            data : {
                potential_ingredient : vm.potential_ingredient,
                ingredient_type : vm.ingedient_category
            }
        });
    }
    
    vm.category_choices = [];
    vm.retrieve_ingredient_categories = function() {
        $http({
            url : '/ingredient-categories', 
            method : 'GET',
        })
        .success((response) => {
            vm.category_choices = response; 
        })
        .error((response) => {
            vm.category_choices = ["there was an error retrieving ingredient types"];
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
        
        var data = {"ingredient" : ingredient};
        $http({
            url : '/find-ingredient',
            method : 'POST',
            data: data
            
        })
        .success((response) => {            
            if(response.length) {
                var ingrediet_type = response[0].type;
                if(ingredients[ingrediet_type].indexOf(ingredient) < 0) {
                    ingredients[ingrediet_type].push(ingredient);
                }
            } else {
                ingredients.unknown.push(ingredient);
            }
        }).error(() => {
            console.log('ERROR');
        });
    }   
    this.addIngredientToList = function(ingredient) {
        findIngredientType(ingredient);
        this.current_ingredient = "";
    }
});


