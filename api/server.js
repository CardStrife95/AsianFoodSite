const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser=require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const configDB = require('./db.js');

mongoose.Promise= global.Promise;
mongoose.connect(configDB.DB,{useNewUrlParser:true}).then(
    ()=> {console.log('Database is connected.')},
    err=>{console.log('Can not connect to the database '+err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.listen(PORT,function(){
    console.log('Server is runnin on Port: ',PORT);
});