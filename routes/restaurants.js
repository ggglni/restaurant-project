const express = require('express');

const router = express.Router();

router.get('/confirm', function(req,res){
    res.render('confirm');
});

router.get('/recommend', function(req,res){
    res.render('recommend');
});

router.post('/recommend', function(req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();  //this doesn't exist yet but JS create it and assign the value
    const storedRestaurants = resData.getStoredRestaurants();
    storedRestaurants.push(restaurant);

    resData.addRestaurants(storedRestaurants);

    res.redirect('/confirm');
});

router.get('/restaurants', function(req,res){
    //read the file
    const storedRestaurants = resData.getStoredRestaurants();
    storedRestaurants.push(restaurant);

    res.render('restaurants', {numberOfRest: storedRestaurants.length, restaurants: storedRestaurants});

});

router.get('/restaurants/:id', function(req, res){
    const restaurantId = req.params.id;

    //read the file
    const storedRestaurants = resData.getStoredRestaurants();
    storedRestaurants.push(restaurant);

    //look for restaurant with that ID 
    for(const restaurant of storedRestaurants){
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-detail', {restaurant: restaurant});
        }
    } 

    res.status(404).render('404');
});

module.exports = router;