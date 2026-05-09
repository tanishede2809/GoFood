const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

// GET user's orders (protected)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('orders')
    res.json(user.orders)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// POST place an order (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { items, totalPrice } = req.body

    const order = {
      items,
      totalPrice,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      }),
      time: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit'
      })
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { orders: { $each: [order], $position: 0 } } },
      { new: true }
    ).select('orders')

    res.status(201).json(user.orders[0])

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

module.exports = router