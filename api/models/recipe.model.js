const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Recipe = new Schema({
    recipe_name: { type: String },
    recipe_author: { type: String },
    recipe_created_at: { type: Date, default: Date.now() },
    recipe_country: { type: String },
    recipe_duration: { type: Number },
    recipe_nb_for_people: { type: Number },
    recipe_picture: { type: Buffer },
    recipe_ingredients: [{ ingredient_text: { type: String } }],
    recipe_steps: [{ step_text: { type: String } }],
    recipe_fav: {
        type: Number,
        min: 0,
        default: 0
    },
    recipe_vote: {
        type: Number,
        min: 0,
        default: 0
    }
}, {
        collection: 'recipe'
    })

module.exports = mongoose.model('Recipe', Recipe)