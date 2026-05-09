const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  restaurantId: String,
  rating: Number,
  comment: String,
  date: String
})

const orderSchema = new mongoose.Schema({
  items: Array,
  totalPrice: Number,
  date: String,
  time: String
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  orders: [orderSchema],
  reviews: [reviewSchema]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)