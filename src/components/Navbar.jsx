import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrdersContext'


function Navbar() {
    const { user, logout } = useAuth()
    const { getTotalItems } = useCart()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }


    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.logoLink}>
                <h1 style={styles.logo}>🍔 GoFood</h1>
            </Link>

            <div style={styles.rightSection}>
                {user && (
                    <Link to="/orders" style={styles.navLink}>
                            📦 Orders
                        </Link>
                )}

                {user && (
                    <>
                        <Link to="/cart" style={styles.cartLink}>
                            🛒 Cart
                            {getTotalItems() > 0 && (
                                <span style={styles.cartBadge}>{getTotalItems()}</span>
                            )}
                        </Link>
                        
                    </>
                )}

                {user ? (
                    <div style={styles.userSection}>
                        <span style={styles.greeting}>Hi, {user.name} 👋</span>
                        <button style={styles.loginBtn} onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button style={styles.loginBtn}>Login</button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: '#ff6b35',
        color: 'white'
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    logo: {
        margin: 0,
        fontsize: '24px'

    },
    logoLink: {
        textDecoration: 'none',
        color: 'white'
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    },
    cartLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    cartBadge: {
        backgroundColor: 'white',
        color: '#ff6b35',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginBtn: {
        padding: '8px 20px',
        backgroundColor: 'white',
        color: '#ff6b35',
        border: 'none',
        borderRadius: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '15px'

    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    greeting: {
        color: 'white',
        fontSize: '14px'
    }

}

export default Navbar