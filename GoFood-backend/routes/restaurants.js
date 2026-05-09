const express = require('express')
const router = express.Router()
const Restaurant = require('../models/Restaurant')

// GET all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, 'name cuisine deliveryTime image rating')
    res.json(restaurants)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// GET single restaurant with full menu
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }
    res.json(restaurant)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router