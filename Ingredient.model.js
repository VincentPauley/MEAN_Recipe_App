var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    name : String,
    category : String,
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
