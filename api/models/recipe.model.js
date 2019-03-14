const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Schema({
    recipe_name:{type:String},
    recipe_author:{type:String},
    recipe_country:{type:String},
    recipe_steps:[{step_text:{type:String}}],
},{
    collection: 'recipe'
});

module.exports=mongoose.model('Recipe',Recipe);