//initialize package
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { application } = require('express');

//require other files
const defaultRoutes = require ('./routes/default');
const restaurantRoutes = require ('./routes/restaurants');

//
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middleware functions
app.use(express.urlencoded({extended: false})); //for post - form
app.use(express.static('public'));  //for static pages

app.use('/', defaultRoutes); //every incoming requests starting with / will be dealt with by defaultRoutes
app.use('/',restaurantRoutes);

//middleware function to handle requests not handled by previous routes
app.use(function(req,res){
    res.status(404).render('404');
});

//middleware for server side errors
app.use(function(error,req,res,next){
    res.status(500).render('500');
});


//listen method to start listening on a certain port
app.listen(3000);