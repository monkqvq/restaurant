// packages and files
const express = require('express');
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json');

// set parameters
const app = express();
const port = 3000;

// set static files
app.use(express.static('public'));

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// routes
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results });
});

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    (item) => item.id.toString() === req.params.restaurant_id
  );

  res.render('show', { restaurant: restaurant });
});

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
