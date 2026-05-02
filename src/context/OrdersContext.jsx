import { createContext, useState, useContext, useEffect } from 'react'

const OrdersContext = createContext()

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const placeOrder = (cartItems, totalPrice) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      totalPrice,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      time: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    setOrders((prev) => [newOrder, ...prev])
  }

  return (
    <OrdersContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  return useContext(OrdersContext)
}