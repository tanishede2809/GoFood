const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number
})

const reviewSchema = new mongoose.Schema({
  userName: String,
  rating: Number,
  comment: String,
  date: String
})

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cuisine: String,
  deliveryTime: String,
  image: String,
  menu: [menuItemSchema],
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)