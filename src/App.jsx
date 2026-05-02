
/*import LandingPage from './pages/LandingPage'

function App() {
  
  return (
    <div>
      <LandingPage/>
    </div>
  )
}

export default App*/

/*import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default App*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'
import CartPage from './pages/CartPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import RestaurantPage from './pages/RestaurantPage'
import OrdersPage from './pages/OrdersPage'
import { ReviewsProvider } from './context/ReviewsContext'

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <ReviewsProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
      </ReviewsProvider>
      </OrdersProvider>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
