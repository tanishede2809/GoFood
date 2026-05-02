import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'


function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

        const matchedUser = existingUsers.find(
            (u) => u.email === email && u.password === password
        )

        if (!matchedUser) {
            setError('Invalid email or password')
            return
        }

        setError('')
        login({ name: matchedUser.name, email: matchedUser.email })
        navigate('/')
    }

    return (
        <div style={styles.card}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back!</h2>
                <p style={styles.subtitle}>Login to your GoFood account</p>

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email
                    </label>
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button style={styles.btn} onClick={handleLogin}>
                        Login
                    </button>

                    <p style={styles.switchText}>
                        Don't have an account?{''}
                        <Link to="/signup" style={styles.link}>Sign up</Link>
                    </p>

                </div>
            </div>
        </div>
    )

}

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#fff3ee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        margin: '0 0 8px 0',
        fontSize: '24px',
        color: '#333'
    },

    subtitle: {
        margin: '0 0 24px 0',
        color: '#888',
        fontSize: '14px'
    },
    inputGroup: {
        marginBottom: '16px'
    },
    label: {
        display: 'block',
        marginBottom: '6px',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#555'
    },
    input: {
        width: '100%',
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '15px',
        boxSizing: 'border-box',
        outline: 'none'
    },
    btn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#ff6b35',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '8px'
    },
    error: {
        color: '#e53e3e',
        backgroundColor: '#fff5f5',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '14px',
        marginBottom: '16px'
    },
    switchText: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '14px',
        color: '#888'
    },
    link: {
        color: '#ff6b35',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}

export default LoginPage
