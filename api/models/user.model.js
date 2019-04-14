const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
    user_name: {type:String},
    user_created_at:{type:Date,default:Date.now()},
    user_country:{type:String},
    user_recipe_create: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }]
    },
    user_favorites_recipes:{
        type: [{
            type:mongoose.Schema.Types.ObjectId,
            ref : 'Recipe'
        }]
    }
    },{
    collection: 'user'  
})

module.exports=mongoose.model('User',User)