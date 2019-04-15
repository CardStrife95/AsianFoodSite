const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const Users = require('../models/user.model')

passport.use(new LocalStrategy({
    username_field: 'user[email]',
    password_field: 'user[password]',
},(email,password,done)=>{
    Users.findOne({email})
    .then(user=>{
        if(!user || !user.validatePasswd()){
            return done(null,false,{errors:{'email or password':'is invalid'}})
        }
        return done(null,user)
    })
    .catch(done)
}))

