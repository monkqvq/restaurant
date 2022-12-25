// packages and files
const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Restaurant = require('./models/restaurant');
const restaurantList = require('./restaurant.json');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/**
 *  Project setting
 */

// set variables
const app = express();
const port = 3000;

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
});

// set static files
app.use(express.static('public'));

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// set app
app.use(bodyParser.urlencoded({ extended: true }));

// set helper for category select.
Handlebars.registerHelper('select', function (selected, value, option) {
  return selected == value ? 'selected' : '';
});

/**
 * Routes
 */

// homepage
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((err) => console.log(err));
});

// add a new restaurant
app.get('/restaurants/add', (req, res) => {
  return res.render('add');
});

app.post('/restaurants', (req, res) => {
  const {
    name,
    category,
    location,
    google_map,
    phone,
    image,
    rating,
    description,
  } = req.body; // get data of restaurant form from req.body

  return Restaurant.create({
    name,
    category,
    location,
    google_map,
    phone,
    image,
    rating,
    description,
  })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

// show info page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id;

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((err) => console.log(err));
});

// edit info page
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id;

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err) => console.log(err));
});

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id;
  const {
    name,
    category,
    location,
    google_map,
    phone,
    image,
    rating,
    description,
  } = req.body;

  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.category = category;
      restaurant.location = location;
      restaurant.google_map = google_map;
      restaurant.phone = phone;
      restaurant.image = image;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err));
});

// delete a restaurant
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id;

  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

// search restaurant by name or category
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((item) => {
    return (
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.category.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  res.render('index', { restaurants: restaurants, keyword: keyword });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on the localhost:${port}`);
});
