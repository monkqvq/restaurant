// packages and files
const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');

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
require('./config/mongoose');

// set static files
app.use(express.static('public'));

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// set app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(routes);

// set helper for category select.
Handlebars.registerHelper('select', function (selected, value, option) {
  return selected == value ? 'selected' : '';
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on the localhost:${port}`);
});
