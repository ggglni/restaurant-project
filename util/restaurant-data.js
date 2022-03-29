const { get } = require('express/lib/response');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'..','data','restaurants.json');

function getStoredRestaurants() {
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

function addRestaurants(restaurantToAdd){
    fs.writeFileSync(filePath, JSON.stringify(restaurantToAdd));
}

module.exports = {
    getStoredRestaurants: getStoredRestaurants,
    addRestaurants: addRestaurants
}