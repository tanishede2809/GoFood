import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'
//import restaurants from '../data/restaurants'
import Navbar from '../components/Navbar'
import ReviewSection from '../components/ReviewSection'

function RestaurantPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await api(`/restaurants/${id}`)
        setRestaurant(data)
      } catch (err) {
        setError('Restaurant not found!')
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurant()
  }, [id])

  const handleAddToCart = (item) => {
    if (!user) {
      alert('Please login to add items to cart!')
      return
    }
    addToCart(item)
    alert(`${item.name} added to cart!`)
  }

  if (loading) return <div><Navbar /><p style={styles.center}>Loading menu... 🍽️</p></div>
  if (error) return <div><Navbar /><p style={styles.center}>{error}</p></div>

  /*const restaurant = restaurants.find((r) => r.id === parseInt(id))

  if (!restaurant) {
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: 'center', marginTop: '40px' }}>Restaurant not found!</h2>
      </div>
    )
  }

  const handleAddToCart = (item) => {
    if (!user) {
      alert('Please login to add items to cart!')
      return
    }
    addToCart(item)
    alert(`${item.name} added to cart!`)
  }*/

  return (
    <div>
      <Navbar />
      <div style={styles.hero}>
        <img src={restaurant.image} alt={restaurant.name} style={styles.heroImage} />
        <div style={styles.heroInfo}>
          <h1 style={styles.name}>{restaurant.name}</h1>
          <p style={styles.meta}>⭐ {restaurant.rating} • {restaurant.cuisine} • 🕒 {restaurant.deliveryTime}</p>
          
        </div>
      </div>

      <div style={styles.menuSection}>
        <h2 style={styles.menuTitle}>Menu</h2>
        <div style={styles.menuGrid}>
          {restaurant.menu.map((item) => (
            <div key={item.id} style={styles.menuCard}>
              <div style={styles.menuInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemDesc}>{item.description}</p>
                <p style={styles.itemPrice}>₹{item.price}</p>
              </div>
              <button
                style={styles.addBtn}
                onClick={() => handleAddToCart(item)}
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
      <ReviewSection restaurantId={restaurant._id} />
    </div>
  )

  
}

const styles = {
  hero: {
    position: 'relative',
    height: '240px',
    overflow: 'hidden'
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.6)'
  },
  heroInfo: {
    position: 'absolute',
    bottom: '24px',
    left: '32px',
    color: 'white'
  },
  name: {
    fontSize: '32px',
    margin: '0 0 8px 0',
    color: 'white'
  },
  meta: {
    fontSize: '16px',
    margin: 0
  },
  menuSection: {
    padding: '32px'
  },
  menuTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333'
  },
  menuGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  menuCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  menuInfo: {
    flex: 1
  },
  itemName: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    color: '#333'
  },
  itemDesc: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#888'
  },
  itemPrice: {
    margin: 0,
    fontWeight: 'bold',
    color: '#ff6b35',
    fontSize: '16px'
  },
  addBtn: {
    padding: '8px 20px',
    backgroundColor: '#ff6b35',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '16px'
  }
}

export default RestaurantPage