import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { api } from '../api'
//import { useOrders } from '../context/OrdersContext'
import Navbar from '../components/Navbar'

function CartPage() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotalPrice } = useCart()
  const { user, token } = useAuth()
  const [ordered, setOrdered] = useState(false)
  const [loading, setLoading] = useState(false)
  /*const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotalPrice } = useCart()
  const { user } = useAuth()
  const [ordered, setOrdered] = useState(false)
  const { placeOrder } = useOrders()*/

  /*const handlePlaceOrder = () => {
    placeOrder(cartItems, getTotalPrice() + 40)
    clearCart()
    setOrdered(true)
  }*/

  const handlePlaceOrder = async () => {
    console.log('Token:', token) // add this line temporarily
    try {
      setLoading(true)
      await api('/orders', 'POST', {
        items: cartItems,
        totalPrice: getTotalPrice() + 40
      }, token)
      clearCart()
      setOrdered(true)
    } catch (err) {
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }



  if (ordered) {
    return (
      <div>
        <Navbar />
        <div style={styles.successPage}>
          <div style={styles.successCard}>
            <div style={styles.successIcon}>🎉</div>
            <h2 style={styles.successTitle}>Order Placed!</h2>
            <p style={styles.successMsg}>
              Your food is being prepared and will be delivered soon!
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div style={styles.emptyPage}>
          <div style={styles.emptyIcon}>🛒</div>
          <h2 style={styles.emptyTitle}>Your cart is empty!</h2>
          <p style={styles.emptyMsg}>Add some delicious food to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.heading}>Your Cart 🛒</h2>

        <div style={styles.layout}>
          <div style={styles.itemsList}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.cartCard}>
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>₹{item.price} each</p>
                </div>

                <div style={styles.controls}>
                  <button style={styles.qtyBtn} onClick={() => decreaseQuantity(item.id)}>−</button>
                  <span style={styles.qty}>{item.quantity}</span>
                  <button style={styles.qtyBtn} onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <p style={styles.itemTotal}>₹{item.price * item.quantity}</p>

                <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Delivery Fee</span>
              <span>₹40</span>
            </div>
            <div style={styles.divider} />
            <div style={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{getTotalPrice() + 40}</span>
            </div>
            <button style={styles.orderBtn} onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: '32px',
    backgroundColor: '#fafafa',
    minHeight: '100vh'
  },
  heading: {
    fontSize: '28px',
    marginBottom: '24px',
    color: '#333'
  },
  layout: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start'
  },
  itemsList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  cartCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    margin: '0 0 4px 0',
    fontSize: '16px',
    color: '#333'
  },
  itemPrice: {
    margin: 0,
    fontSize: '14px',
    color: '#888'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qty: {
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center'
  },
  itemTotal: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: '16px',
    minWidth: '60px',
    textAlign: 'right'
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ccc',
    fontSize: '16px',
    cursor: 'pointer'
  },
  summary: {
    width: '280px',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
  },
  summaryTitle: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    color: '#333'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '15px',
    color: '#555'
  },
  divider: {
    borderTop: '1px solid #eee',
    margin: '16px 0'
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#333',
    marginBottom: '20px'
  },
  orderBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#ff6b35',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  emptyPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh'
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  emptyTitle: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '8px'
  },
  emptyMsg: {
    color: '#888',
    fontSize: '16px'
  },
  successPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh'
  },
  successCard: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
  },
  successIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  successTitle: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '12px'
  },
  successMsg: {
    color: '#888',
    fontSize: '16px'
  }
}

export default CartPage