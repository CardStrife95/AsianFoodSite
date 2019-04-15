const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

let User = new Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_created_at: { type: Date, default: Date.now() },
    user_country: { type: String },
    user_recipe_create: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        default: null,
    },
    user_favorites_recipes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }],
        default: null,
    },
    user_hash: { type: String },
    user_salt: { type: String }
}, {
        collection: 'user'
    })

User.methods.setPassword = function (passwd) {
    this.user_salt = crypto.randomBytes(16).toString('hex')
    this.user_hash = crypto.pbkdf2Sync(passwd, this.user_salt, 10000, 512, 'sha512').toString('hex')
}

User.methods.validatePasswd = function (passwd) {
    const hash = crypto.pbkdf2Sync(passwd, this.user_salt, 10000, 512, 'sha512').toString('hex')
    return this.user_hash === hash
}

User.methods.generateJwt = function () {
    const currentDate = new Date()
    const expiredDate = new Date(currentDate)
    expiredDate.setDate(currentDate.getDate() + 60)

    return jwt.sign({
        email: this.user_email,
        id: this._id,
        exp: parseInt(expiredDate.getTime() / 1000, 10),
    }, 'secret')
}

User.methods.toAuthJson = function () {
    return {
        _id: this._id,
        email: this.user_email,
        token: this.generateJwt(),
    }
}

module.exports = mongoose.model('User', User)