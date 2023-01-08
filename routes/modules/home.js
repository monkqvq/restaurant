const express = require('express');
const Restaurant = require('../../models/restaurant');

const router = express.Router();

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((err) => console.log(err));
});

router.get('/:sort', (req, res) => {
  const sort = req.params.sort;

  if (sort === 'sort_asc') {
    Restaurant.find()
      .lean()
      .sort({ _id: 'asc' })
      .then((restaurants) => res.render('index', { restaurants }))
      .catch((err) => console.log(err));
  } else if (sort === 'sort_desc') {
    Restaurant.find()
      .lean()
      .sort({ _id: 'desc' })
      .then((restaurants) => res.render('index', { restaurants }))
      .catch((err) => console.log(err));
  } else if (sort === 'sort_cat') {
    Restaurant.find()
      .lean()
      .sort({ category: '1' })
      .then((restaurants) => res.render('index', { restaurants }))
      .catch((err) => console.log(err));
  } else if (sort === 'sort_loc') {
    Restaurant.find()
      .lean()
      .sort({ location: '1' })
      .then((restaurants) => res.render('index', { restaurants }))
      .catch((err) => console.log(err));
  }
});

module.exports = router;
