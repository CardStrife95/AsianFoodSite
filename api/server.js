const express = require('express')
const app = express()
const PORT = 4000
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const errorHandler = require('errorhandler')

//DB
const mongoose = require('mongoose')
const configDB = require('./config/db.js')

//Route
require('./models/user.model')
require('./config/passport')
const websiteRoute = require('./routes/website.route')
const recipeRoute = require('./routes/recipe.route')
const userRoute = require('./routes/user.route')

mongoose.Promise = global.Promise
mongoose.connect(configDB.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected.') },
    err => { console.log('Can not connect to the database ' + err) }
)
mongoose.set('debug','true')

app.use(cors())
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
    secret : 'asianfoodsite-secret',
    cookie: {maxAge: 6000 },
    resave: false,
    saveUninitialized: false
}))

app.use('/', websiteRoute)
app.use('/recipe', recipeRoute)
app.use('/user', userRoute)

app.listen(PORT, function () {
    console.log('Server is runnin on Port: ', PORT);
})