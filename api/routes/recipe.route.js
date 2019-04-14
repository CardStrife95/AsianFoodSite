const express = require('express')
const recipeRoute = express.Router()


let Recipe = require('../models/recipe.model')


recipeRoute.route('/').get(function (req, res) {
    Recipe.find(function (err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipes);
        }
    })
})

recipeRoute.route('/:id').get(function (req, res) {
    let id = req.params.id
    Recipe.findById(id, function (err, recipe) {
        if (err) {
            console.log(err);
        } else {
            console.log(recipe);
            res.json(recipe);
        }
    })
})

recipeRoute.route('/add').post(function (req, res) {
    let recipe = new Recipe(req.body)
    recipe.save()
        .then(
            recipe => {
                console.log('SUCCESS');
                res.status(200).json({ 'recipe': 'recipe in added successfully' });
            }
        )
        .catch(err => {
            res.status(400).send("unable to save to database");
        }
        )
})

recipeRoute.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Recipe.findById(id, function (err, recipe) {
        res.json(recipe)
    })
})

recipeRoute.route('/update/:id').post(function (req, res) {
    let id = req.params.id;
    Recipe.findById(id, function (err, recipe) {
        if (!recipe) res.status(404).send("recipe not found ");
        else {
            recipe.recipe_name = req.body.recipe_name;
            recipe.recipe_country = req.body.recipe_country;
            recipe.recipe_author = req.body.recipe_author;
            recipe.recipe_steps = req.body.recipe_steps;

            recipe.save().then(recipe => {
                res.json('Update completed');
            }).catch(err => {
                res.status(400).send("unable to update the recipe to the database");
            })
        }
    })
})

recipeRoute.route('/delete/:id').get(function (req, res) {
    Recipe.findByIdAndRemove({ "_id": req.params.id }, function (err, recipe) {
        if (err) res.json(err);
        else res.json('Successfully removed')
    })
})

module.exports = recipeRoute