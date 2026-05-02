import { Link } from 'react-router-dom'

function RestaurantCard({ id, name, cuisine, rating, deliveryTime, image }){
    return(
        <Link to={`/restaurant/${id}`} style={styles.link}>
        <div style={styles.card}>
            <img src={image} alt={name} style={styles.image} />
            <div style={styles.info}>
                <h3 style={styles.name}>{name}</h3>
                <p style={styles.cuisine}>{cuisine}</p>
                <div style={styles.meta}>
                    <span>⭐ {rating} </span>
                    <span>🕒 {deliveryTime} </span>
                </div>
            </div>

        </div>
        </Link>
    )
}


const styles = {
    card: {
        width: '260px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    image: {
        width: '100%',
        height: '160px',
        objectFit: 'cover'
    },
    info:{
        padding: '12px'
    },
    name:{
        margin: '0 0 4px 0',
        fontSize: '18px',
        color: '#333'

    },
    cuisine:{
        margin: '0 0 8px 0',
        color: '#888',
        fontSize: '14px'

    },
    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#555'

    },


}


export default RestaurantCard