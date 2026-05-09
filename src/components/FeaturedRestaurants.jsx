import { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import { api } from '../api'

function FeaturedRestaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await api('/restaurants')
        setRestaurants(data)
      } catch (err) {
        setError('Failed to load restaurants')
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  if (loading) return <div style={styles.center}>Loading restaurants... 🍽️</div>
  if (error) return <div style={styles.center}>{error}</div>

  return (
    <div style={styles.section}>
      <h2 style={styles.heading}>Featured Restaurants</h2>
      <div style={styles.grid}>
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            name={restaurant.name}
            cuisine={restaurant.cuisine}
            rating={restaurant.rating}
            deliveryTime={restaurant.deliveryTime}
            image={restaurant.image}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  section: {
    padding: '48px 32px',
    backgroundColor: '#fafafa'
  },
  heading: {
    fontSize: '28px',
    marginBottom: '24px',
    color: '#0f0404'
  },
  grid: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap'
  },
  center: {
    padding: '48px',
    textAlign: 'center',
    color: '#888'
  }
}

export default FeaturedRestaurants



/*import { useState, useEffect } from 'react'
import restaurants from '../data/restaurants'
import RestaurantCard from './RestaurantCard'
import { api } from '../api'

function FeaturedRestaurants() {
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await api('/restaurants')
        setRestaurants(data)
      } catch (err) {
        setError('Failed to load restaurants')
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

    if (loading) return <div style={styles.center}>Loading restaurants... 🍽️</div>
    if (error) return <div style={styles.center}>{error}</div>

    return (
        <div style={StyleSheet.section}>
            <h2 style={StyleSheet.heading}>Featured Restaurants</h2>
            <div style={StyleSheet.grid}>
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        id={restaurant.id}
                        name={restaurant.name}
                        cuisine={restaurant.cuisine}
                        rating={restaurant.rating}
                        deliveryTime={restaurant.deliveryTime}
                        image={restaurant.image}
                    />
                ))}

            </div>

        </div>
    )
}
        

        const styles = {
        section: {
            padding: '48px 32px',
            backgroundColor: '#fafafa'
        },
        heading: {
            fontSize: '28px',
            marginBottom: '24px',
            color: '#0f0404'
        },
        grid: {
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap'
        }

    }



export default FeaturedRestaurants*/