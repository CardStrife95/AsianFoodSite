const express = require('express')
const userRoute = express.Router()

let User = require('../models/user.model');
let Recipe = require('../models/recipe.model')

userRoute.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) throw err
        else {
            console.log(users)
            res.json(users)
        }
    })
})

userRoute.route('/add').post(function (req, res) {
    let user = new User(req.body)
    user.save()
        .then(
            user => {
                console.log('SUCCESS')
                res.status(200).json({ 'user': 'user in added successfully' })
            }
        )
        .catch(
            err => {
                console.error(err)
                res.status(400).send('unable to save to database')
            }
        )
})

userRoute.route('/:id').get(function (req, res) {
    let id = req.params.id
    User.findById(id, function (err, user) {
        if (err) throw err
        res.json(user)
    })
})

userRoute.route('/:id').post(function(req,res){
    let id = req.params.id
    User.findByIdAndUpdate(id,function(err,user){
        if(err) throw err
        if(user){
            user.user_name = req.params.user_name
            user.user_country = req.params.user_country
            user.save()
            .then(user=>{
                console.log("Successfully updated")
                res.json({200:'Successfully updated"'})
            })
            .catch()
        }else{
            res.status(404).json({404:'Cannot findthe user'})
        }
    })
})

userRoute.route('/:id/recipe/:idrecipe/fav').post(function (req, res) {
    let id = req.params.id
    let idrecipe = req.params.idrecipe
    User.findByIdAndUpdate(id, function (err, user) {
        if (err) {
            throw err
        }
        if (!user) {
            console.log('Error : user not found')
            res.status(404).send("user not found in database")
        } else {
            Recipe.findByIdAndUpdate(idrecipe, { $inc: { recipe_fav: 1 } }, function (err, recipe) {
                if (err) {
                    throw err
                }
                recipe.save()
                    .then(recipe => {
                        res.json('favorite add')
                        user.user_favorites_recipes.push(recipe._id)
                        user.save()
                            .then(user => {
                                res.json('Successfully update')
                            }).catch(err => {
                                res.status(400).send('Error on favorite for the user')
                            })
                    })
                    .catch(err => {
                        res.status(400).send('unable to favorite the recipe ')
                    })

            })
        }

    })
})

module.exports = userRoute