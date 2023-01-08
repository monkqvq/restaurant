const express = require('express');
const Restaurant = require('../../models/restaurant');

const router = express.Router();

// add a new restaurant
router.get('/add', (req, res) => {
  return res.render('add');
});

router.post('/', (req, res) => {
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
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id;

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((err) => console.log(err));
});

// edit info page
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id;

  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err) => console.log(err));
});

router.put('/:restaurant_id', (req, res) => {
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
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id;

  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

module.exports = router;
