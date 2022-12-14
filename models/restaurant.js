const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  image: String,
  location: { type: String, require: true },
  phone: { type: String, require: true },
  google_map: String,
  rating: String,
  description: String,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
