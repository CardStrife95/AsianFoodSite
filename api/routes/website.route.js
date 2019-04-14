const express = require('express')
const websiteRouter = express.Router()

websiteRouter.route('/').get(function(req,res){
    res.json({'200':'Success'})
})

module.exports = websiteRouter