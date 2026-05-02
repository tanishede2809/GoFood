import { createContext, useState, useContext, useEffect } from 'react'

const ReviewsContext = createContext()

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const addReview = (restaurantId, review) => {
    setReviews((prev) => ({
      ...prev,
      [restaurantId]: [review, ...(prev[restaurantId] || [])]
    }))
  }

  const getReviews = (restaurantId) => {
    return reviews[restaurantId] || []
  }

  return (
    <ReviewsContext.Provider value={{ addReview, getReviews }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  return useContext(ReviewsContext)
}