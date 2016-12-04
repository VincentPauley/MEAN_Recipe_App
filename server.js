var express = require('express');
var app = express();

app.use(express.static('public')); // serve public directory to client


app.listen(3000, function() {
    console.log('up and running'); 
});