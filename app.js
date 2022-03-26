//initialize package
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

//
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middleware functions
app.use(express.urlencoded({extended: false})); //for post - form
app.use(express.static('public'));  //for static pages

app.get('/about', function(req,res){
    res.render('about');
});

app.get('/confirm', function(req,res){
    res.render('confirm');
});

app.get('/', function(req,res){
    res.render('index');
});

app.get('/recommend', function(req,res){
    res.render('recommend');
});

app.post('/recommend', function(req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();  //this doesn't exist yet but JS create it and assign the value
    const filePath = path.join(__dirname,'data','restaurants.json');

    const fileData = fs.readFileSync(filePath);

    const storedRestaurants = JSON.parse(fileData);
    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect('/confirm');
});

app.get('/restaurants', function(req,res){
    //read the file
    const filePath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    res.render('restaurants', {numberOfRest: storedRestaurants.length, restaurants: storedRestaurants});

});

app.get('/restaurants/:id', function(req, res){
    const restaurantId = req.params.id;

    //read the file
    const filePath = path.join(__dirname,'data','restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    //look for restaurant with that ID 
    for(const restaurant in storedRestaurants){
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-detail', {restaurant: restaurant});
        }
    } 
});

//listen method to start listening on a certain port
app.listen(3000);