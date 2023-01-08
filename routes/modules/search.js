const express = require('express');
const Restaurant = require('../../models/restaurant');

const router = express.Router();

// search restaurant by name or category
router.get('/', (req, res) => {
  const keyword = req.query.keyword;

  return Restaurant.find()
    .lean()
    .then((items) => {
      // console.log('items: ' + items);
      items = items.filter((item) => {
        // console.log('item: ' + item);
        return (
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.category.toLowerCase().includes(keyword.toLowerCase())
        );
      });
      return items;
    })
    .then((restaurants) => {
      res.render('index', { restaurants: restaurants, keyword: keyword });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
