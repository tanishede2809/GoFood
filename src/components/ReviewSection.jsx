/*import { useState, useEffect } from 'react'
//import { useReviews } from '../context/ReviewsContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

function StarPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            fontSize: '28px',
            cursor: 'pointer',
            color: star <= value ? '#f6ad55' : '#ddd'
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewSection({ restaurantId }) {

  const { user, token } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api(`/reviews/${restaurantId}`)
        setReviews(data.reviews)
      } catch (err) {
        console.log('Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [restaurantId])

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a star rating')
      return
    }
    if (!comment.trim()) {
      setError('Please write a review')
      return
    }
    try {
      const data = await api(
        `/reviews/${restaurantId}`,
        'POST',
        { rating, comment, userName: user.name },
        token
      )
      setReviews((prev) => [data.review, ...prev])
      setRating(0)
      setComment('')
      setError('')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError('Failed to submit review')
    }
  }

  
  /*const { addReview, getReviews } = useReviews()
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const reviews = getReviews(restaurantId)

  const handleSubmit = () => {
    if (rating === 0) {
      setError('Please select a star rating')
      return
    }
    if (!comment.trim()) {
      setError('Please write a review')
      return
    }
    addReview(restaurantId, {
      user: user.name,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    })
    setRating(0)
    setComment('')
    setError('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }*/

  /*return (
    <div style={styles.section}>
      <h2 style={styles.heading}>Reviews</h2>

      {user ? (
        <div style={styles.reviewForm}>
          <h3 style={styles.formTitle}>Leave a Review</h3>
          <StarPicker value={rating} onChange={setRating} />
          {error && <p style={styles.error}>{error}</p>}
          {submitted && <p style={styles.success}>Review submitted! ✅</p>}
          <textarea
            style={styles.textarea}
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
          <button style={styles.btn} onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      ) : (
        <p style={styles.loginPrompt}>
          Please login to leave a review.
        </p>
      )}

      <div style={styles.reviewsList}>
        {reviews.length === 0 ? (
          <p style={styles.noReviews}>No reviews yet. Be the first!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <div style={styles.avatar}>
                  {review.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={styles.reviewUser}>{review.user}</p>
                  <p style={styles.reviewDate}>{review.date}</p>
                </div>
                <div style={styles.stars}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p style={styles.reviewComment}>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  section: {
    padding: '32px',
    borderTop: '1px solid #f0f0f0'
  },
  heading: {
    fontSize: '24px',
    marginBottom: '24px',
    color: '#333'
  },
  reviewForm: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  formTitle: {
    fontSize: '16px',
    marginBottom: '12px',
    color: '#333'
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    resize: 'vertical',
    boxSizing: 'border-box',
    outline: 'none',
    marginBottom: '12px',
    fontFamily: 'inherit'
  },
  btn: {
    padding: '10px 24px',
    backgroundColor: '#ff6b35',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px'
  },
  error: {
    color: '#e53e3e',
    fontSize: '13px',
    marginBottom: '8px'
  },
  success: {
    color: '#38a169',
    fontSize: '13px',
    marginBottom: '8px'
  },
  loginPrompt: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '24px'
  },
  reviewsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  noReviews: {
    color: '#aaa',
    fontSize: '14px'
  },
  reviewCard: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#ff6b35',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    flexShrink: 0
  },
  reviewUser: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333'
  },
  reviewDate: {
    margin: 0,
    fontSize: '12px',
    color: '#aaa'
  },
  stars: {
    marginLeft: 'auto',
    color: '#f6ad55',
    fontSize: '16px'
  },
  reviewComment: {
    margin: 0,
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6'
  }
}

export default <ReviewSection>*/


import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'

function StarPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            fontSize: '28px',
            cursor: 'pointer',
            color: star <= value ? '#f6ad55' : '#ddd'
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewSection({ restaurantId }) {
  const { user, token } = useAuth()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api(`/reviews/${restaurantId}`)
        setReviews(data.reviews)
      } catch (err) {
        console.log('Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [restaurantId])

  const handleSubmit = async () => {
  if (rating === 0) {
    setError('Please select a star rating')
    return
  }
  if (!comment.trim()) {
    setError('Please write a review')
    return
  }
  try {
    await api(
      `/reviews/${restaurantId}`,
      'POST',
      { rating, comment, userName: user.name },
      token
    )
    // re-fetch reviews after submitting
    const data = await api(`/reviews/${restaurantId}`)
    setReviews(data.reviews)
    setRating(0)
    setComment('')
    setError('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  } catch (err) {
    console.log(err)
    setError('Failed to submit review')
  }
}

  /*const handleSubmit = async () => {
    if (rating === 0) {
      setError('Please select a star rating')
      return
    }
    if (!comment.trim()) {
      setError('Please write a review')
      return
    }
    try {
      const data = await api(
        `/reviews/${restaurantId}`,
        'POST',
        { rating, comment, userName: user.name },
        token
      )
      setReviews((prev) => [data.review, ...prev])
      setRating(0)
      setComment('')
      setError('')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError('Failed to submit review')
    }
  }*/

  return (
    <div style={styles.section}>
      <h2 style={styles.heading}>Reviews</h2>

      {user ? (
        <div style={styles.reviewForm}>
          <h3 style={styles.formTitle}>Leave a Review</h3>
          <StarPicker value={rating} onChange={setRating} />
          {error && <p style={styles.error}>{error}</p>}
          {submitted && <p style={styles.success}>Review submitted! ✅</p>}
          <textarea
            style={styles.textarea}
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
          <button style={styles.btn} onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      ) : (
        <p style={styles.loginPrompt}>Please login to leave a review.</p>
      )}

      <div style={styles.reviewsList}>
        {loading ? (
          <p style={styles.noReviews}>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p style={styles.noReviews}>No reviews yet. Be the first!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <div style={styles.avatar}>
                  {review.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={styles.reviewUser}>{review.userName}</p>
                  <p style={styles.reviewDate}>{review.date}</p>
                </div>
                <div style={styles.stars}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p style={styles.reviewComment}>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  section: {
    padding: '32px',
    borderTop: '1px solid #f0f0f0'
  },
  heading: {
    fontSize: '24px',
    marginBottom: '24px',
    color: '#333'
  },
  reviewForm: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  formTitle: {
    fontSize: '16px',
    marginBottom: '12px',
    color: '#333'
  },
  textarea: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    resize: 'vertical',
    boxSizing: 'border-box',
    outline: 'none',
    marginBottom: '12px',
    fontFamily: 'inherit'
  },
  btn: {
    padding: '10px 24px',
    backgroundColor: '#ff6b35',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px'
  },
  error: { color: '#e53e3e', fontSize: '13px', marginBottom: '8px' },
  success: { color: '#38a169', fontSize: '13px', marginBottom: '8px' },
  loginPrompt: { color: '#888', fontSize: '14px', marginBottom: '24px' },
  reviewsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  noReviews: { color: '#aaa', fontSize: '14px' },
  reviewCard: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#ff6b35',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    flexShrink: 0
  },
  reviewUser: { margin: 0, fontWeight: 'bold', fontSize: '14px', color: '#333' },
  reviewDate: { margin: 0, fontSize: '12px', color: '#aaa' },
  stars: { marginLeft: 'auto', color: '#f6ad55', fontSize: '16px' },
  reviewComment: { margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }
}

export default ReviewSection