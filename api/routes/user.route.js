const express = require('express')
const userRoute = express.Router()
const auth = require('./auth')

let User = require('../models/user.model');
let Recipe = require('../models/recipe.model')

userRoute.route('/').get(auth.optional, function (req, res) {
    User.find(function (err, users) {
        if (err) throw err
        else {
            console.log(users)
            return res.json(users)
        }
    })
})

userRoute.route('/add').post(auth.optional, function (req, res) {
    //console.log(res.body)
    let user = req.body
    console.log(user)

    if (!user.user_email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        })
    }

    if (!user.user_password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        })
    }

    let finalUser = new User(user)

    finalUser.setPassword(user.user_password)

    finalUser.save()
        .then(
            user => {
                console.log('SUCCESS')
                res.status(200).json({ 'user': finalUser.toAuthJson() })
            }
        )
        .catch(
            err => {
                console.error(err)
                res.status(400).send('unable to save to database')
            }
        )

})

userRoute.route('/login').post(auth.optional, function (req, res) {
    let user = req.body;
    console.log(user)
    if (!user.user_email_or_name || user.user_email_or_name === null) {
        res.status(422).json({
            errors: { email: 'is required', },
        })
       //res.json({'422':'email is required'})
    } else if (!user.user_password || user.user_password === null) {
        res.status(422).json({
            errors: {
                password: 'is required',
            },
        })
    }
    //User.findOne({user_name:user.user_email_or_name},)
    //console.log(user)
})

userRoute.route('/:id').get(auth.optional, function (req, res) {
    let id = req.params.id
    User.findById(id, function (err, user) {
        if (err) throw err
        res.json(user)
    })
})

userRoute.route('/update/:id').post(function (req, res) {
    let id = req.params.id
    User.findByIdAndUpdate(id, function (err, user) {
        if (err) throw err
        if (user) {
            user.user_name = req.params.user_name
            user.user_country = req.params.user_country
            user.save()
                .then(user => {
                    console.log("Successfully updated")
                    res.json({ 200: 'Successfully updated"' })
                })
                .catch(err => {
                    console.error(err)
                    res.json('Error on updating on user '.id)
                })
        } else {
            res.status(404).json({ 404: 'Cannot find the user' })
        }
    })
})

userRoute.route('/:id/recipes').get(auth.optional, function (req, res) {
    let id = req.params.id
    User.findById(id, function (err, user) {
        if (err) throw err
        if (!user) {
            res.status(404).json({ 404: 'Cannot find the user '.id })
            console.error('Cannot find the user '.id)
        } else {
            if (user.recipe_create.length > 0) {
                res.json(user.recipe_create)
            } else {
                res.json('No created recipe')
            }
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
                if (!recipe) {
                    console.error('Error on User Fav : Cannot find recipe')
                    res.status(404).json({ 404: 'Cannot find the recipe in the database' })
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

userRoute.route('/delete/:id').get(function (req, res) {
    let id = req.params.id
    User.findByIdAndRemove({ _id: id }, function (err, user) {
        if (err) throw err
        else res.json('Successfully removed')
    })
})

module.exports = userRoute