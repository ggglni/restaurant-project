//initialize package
const express = require('express');
const path = require('path');
const fs = require('fs');

//
const app = express();

//middleware functions
app.use(express.urlencoded({extended: false})); //for post - form
app.use(express.static('public'));  //for static pages

app.get('/about', function(req,res){
    const aboutPath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(aboutPath)
});

app.get('/confirm', function(req,res){
    const confirmPath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(confirmPath)
});

app.get('/', function(req,res){
    const indPath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(indPath)
});

app.get('/recommend', function(req,res){
    const recPath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(recPath)
});

app.post('/recommend', function(req,res){
    const restaurant = req.body;
    const filePath = path.join(__dirname,'data','restaurants.js');
    const fileData = fs.readFileSync(filePath);

    const storedRestaurants = JSON.parse(fileData);
    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
});

app.get('/restaurants', function(req,res){
    const restPath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(restPath)
});







//listen method to start listening on a certain port
app.listen(3000);