const mongoose = require('mongoose');
const Restaurant = require('../restaurant');
const restaurantList = require('../../restaurant.json').results;

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

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
