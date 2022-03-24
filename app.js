//initialize package
const express = require('express');

//
const app = express();

//middleware function
app.use(express.urlencoded({extended: false})); 

app.get('/', function(req,res){
    res.send('<h1>ok</h1>');
});

//listen method to start listening on a certain port
app.listen(3000);