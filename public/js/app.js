

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
        templateUrl : 'templates/create_new.html'
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


