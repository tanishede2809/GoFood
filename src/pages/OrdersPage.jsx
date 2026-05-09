import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
//import { useOrders } from '../context/OrdersContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../api'
import { Link } from 'react-router-dom'

function OrdersPage() {
  const { user, token } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    const fetchOrders = async () => {
      try {
        const data = await api('/orders', 'GET', null, token)
        setOrders(data)
      } catch (err) {
        console.log('Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])


  if (!user) {
    return (
      <div>
        <Navbar />
        <div style={styles.centerPage}>
          <p style={styles.message}>Please login to view your orders.</p>
          <Link to="/login" style={styles.link}>Login</Link>
        </div>
      </div>
    )
  }

  if (loading) return <div><Navbar /><p style={{ textAlign: 'center', padding: '48px' }}>Loading orders...</p></div>

  if (orders.length === 0) {
    return (
      <div>
        <Navbar />
        <div style={styles.centerPage}>
          <div style={styles.emptyIcon}>📦</div>
          <h2 style={styles.emptyTitle}>No orders yet!</h2>
          <p style={styles.message}>Your order history will appear here.</p>
          <Link to="/" style={styles.link}>Browse Restaurants</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.heading}>Your Orders 📦</h2>
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <div>
                  <span style={styles.orderId}>Order #{order.id}</span>
                  <span style={styles.orderDate}>{order.date} at {order.time}</span>
                </div>
                <span style={styles.orderTotal}>₹{order.totalPrice}</span>
              </div>
              <div style={styles.divider} />
              <div style={styles.itemsList}>
                {order.items.map((item) => (
                  <div key={item.id} style={styles.itemRow}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemQty}>x{item.quantity}</span>
                    <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div style={styles.statusBadge}>✅ Delivered</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: '32px',
    maxWidth: '720px',
    margin: '0 auto'
  },
  heading: {
    fontSize: '28px',
    marginBottom: '24px',
    color: '#333'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  orderId: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    display: 'block'
  },
  orderDate: {
    fontSize: '13px',
    color: '#888',
    display: 'block',
    marginTop: '4px'
  },
  orderTotal: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ff6b35'
  },
  divider: {
    borderTop: '1px solid #f0f0f0',
    marginBottom: '12px'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#555'
  },
  itemName: {
    flex: 1
  },
  itemQty: {
    color: '#888',
    marginRight: '16px'
  },
  itemPrice: {
    fontWeight: 'bold',
    color: '#333'
  },
  statusBadge: {
    display: 'inline-block',
    backgroundColor: '#f0fff4',
    color: '#38a169',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold'
  },
  centerPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '12px'
  },
  emptyIcon: {
    fontSize: '64px'
  },
  emptyTitle: {
    fontSize: '24px',
    color: '#333'
  },
  message: {
    color: '#888',
    fontSize: '16px'
  },
  link: {
    color: '#ff6b35',
    fontWeight: 'bold',
    fontSize: '15px'
  }
}

export default OrdersPage