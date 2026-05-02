import restaurants from '../data/restaurants'
import RestaurantCard from './RestaurantCard'

function FeaturedRestaurants() {
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



export default FeaturedRestaurants