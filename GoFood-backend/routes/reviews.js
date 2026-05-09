/*const express = require('express')
const router = express.Router()
const Restaurant = require('../models/Restaurant')
const User = require('../models/User')
const auth = require('../middleware/auth')

// GET reviews for a restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId).select('reviews rating')
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }
    res.json({ reviews: restaurant.reviews, rating: restaurant.rating })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// POST a review (protected)
router.post('/:restaurantId', auth, async (req, res) => {
  try {
    const { rating, comment, userName } = req.body

    

    const date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })

    const review = { userName, rating, comment, date }

    // Add review to restaurant
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      { $push: { reviews: { $each: [review], $position: 0 } } },
      { new: true }
    )

    // Recalculate average rating
    const totalRating = restaurant.reviews.reduce((sum, r) => sum + r.rating, 0)
    const avgRating = +(totalRating / restaurant.reviews.length).toFixed(1)
    await Restaurant.findByIdAndUpdate(req.params.restaurantId, { rating: avgRating })

    // Also save review to user's profile
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { reviews: { restaurantId: req.params.restaurantId, rating, comment, date } } }
    )

    res.status(201).json({ review, newRating: avgRating })

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router*/

const express = require('express')
const router = express.Router()
const Restaurant = require('../models/Restaurant')
const User = require('../models/User')
const auth = require('../middleware/auth')

// GET reviews for a restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId).select('reviews rating')
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }
    res.json({ reviews: restaurant.reviews, rating: restaurant.rating })
  } catch (err) {
    console.log('GET reviews error:', err.message)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// POST a review (protected)
router.post('/:restaurantId', auth, async (req, res) => {
  try {
    const { rating, comment, userName } = req.body
    console.log('Incoming review:', { restaurantId: req.params.restaurantId, rating, comment, userName, userId: req.user.userId })

    const date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })

    const review = { userName, rating, comment, date }

    // Add review to restaurant
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      { $push: { reviews: { $each: [review], $position: 0 } } },
      { returnDocument: 'after' }
    )

    if (!restaurant) {
      console.log('Restaurant not found for id:', req.params.restaurantId)
      return res.status(404).json({ message: 'Restaurant not found' })
    }

    // Recalculate average rating
    const totalRating = restaurant.reviews.reduce((sum, r) => sum + r.rating, 0)
    const avgRating = +(totalRating / restaurant.reviews.length).toFixed(1)
    await Restaurant.findByIdAndUpdate(req.params.restaurantId, { rating: avgRating })

    // Also save review to user's profile
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { reviews: { restaurantId: req.params.restaurantId, rating, comment, date } } }
    )

    console.log('Review saved successfully!')
    res.status(201).json({ review, newRating: avgRating })

  } catch (err) {
    console.log('POST review error:', err.message)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router