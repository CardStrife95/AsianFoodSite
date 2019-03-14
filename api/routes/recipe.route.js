const express = require('express');
const recipeRoute = express.Router();


let Recipe = require('../models/recipe.model');


recipeRoute.route('/').get(function(req,res){
    Recipe.find(function(err,recipes){
        if(err){
            console.log(err);
        }else{
            res.json(recipes);
        }
    });
});

recipeRoute.route('/add').post(function(req,res){
    let recipe = new Recipe(req.body);
    recipe.save()
    .then(
        recipe=>{
            console.log('SUCCESS');
            res.status(200).json({'recipe':'recipe in added successfully'});
        }
    )
    .catch(err=>{
        res.status(400).send("unable to save to database");
    }
    );
});

module.exports = recipeRoute;