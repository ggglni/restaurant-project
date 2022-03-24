//initialize package
const express = require('express');
const path = require('path');

//
const app = express();

//middleware function
app.use(express.urlencoded({extended: false})); 

app.get('/', function(req,res){
    res.send('<h1>ok</h1>');
    console.log('pistol');
});

app.get('/about', function(req,res){
    const aboutPath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(aboutPath)
})

app.get('/confirm', function(req,res){
    const confirmPath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(confirmPath)
})

app.get('/index', function(req,res){
    const indPath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(indPath)
})

app.get('/recommend', function(req,res){
    const recPath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(recPath)
})

app.get('/restaurants', function(req,res){
    const restPath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(restPath)
})





//listen method to start listening on a certain port
app.listen(3000);