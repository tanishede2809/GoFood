function HeroSection() {
    return(
        <div style={styles.hero}>
            <h2 style={styles.heading}> Hungry? We've got you. </h2>
            <p style={styles.subheading}> Order from the best restaurants in you city, delivered fast. </p>
            
        </div>
    )
}

const styles = {
    hero: {
        backgroundColor: '#fff3ee',
        padding: '80px 32px',
        textAlign: 'center',
    },
    heading: {
        fontSize: '42px',
        color: '#333',
        margin: '0 0 16px 0'
    },
    subheading: {
        fontSize: '18px',
        color: '#666',
        marginBottom: '32px'
    },
    btn: {
        padding: '14px 36px',
        backgroundColor: '#ff6b35',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        fontSize: '18px',
        cursor: 'pointer'
    }

}

export default HeroSection