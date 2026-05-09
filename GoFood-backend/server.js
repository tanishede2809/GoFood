const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/restaurants', require('./routes/restaurants'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/reviews', require('./routes/reviews'))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'FoodDash API is running!' })
})

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log('❌ MongoDB connection failed:', err.message)
  })