const express = require('express');

const router = express.Router();

const resData = require('../util/restaurant-data');

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
    let order = req.query.order;
    let nextOrder = 'DESC';
    
    if (order !== 'ASC' && order !== 'DESC'){
        order = "ASC"
    }

    if (order == 'ASC'){
        nextOrder == 'DESC';
    }
    else {
        nextOrder == 'ASC';
    }

    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.sort(function(resA, resB){ 
        if ((order = 'ASC' && resA.name > resB.name) || (order = 'DESC' && resA.name > resB.name)) {
            return 1
        }
        else {
            return -1
        }
    });

    res.render('restaurants', {
        numberOfRest: storedRestaurants.length,
        restaurants: storedRestaurants,
        nextOrder: order
    });

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