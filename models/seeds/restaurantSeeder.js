const Restaurant = require('../restaurant');
const restaurantList = require('../../restaurant.json').results;

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const db = require('../../config/mongoose');

db.once('open', () => {
  console.log('mongodb connected!');
  restaurantList.forEach((item) => {
    Restaurant.create({
      name: item.name,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description,
    });
  });
  console.log('Success !!');
});
