const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.5,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    menu: [
      { id: 101, name: "Margherita Pizza", price: 299, description: "Classic tomato and mozzarella" },
      { id: 102, name: "Pepperoni Pizza", price: 349, description: "Loaded with pepperoni" },
      { id: 103, name: "Garlic Bread", price: 99, description: "Toasted with garlic butter" },
      { id: 104, name: "Pasta Arrabbiata", price: 249, description: "Spicy tomato pasta" }
    ]
  },
  {
    id: 2,
    name: "Burger Barn",
    cuisine: "American",
    rating: 4.2,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    menu: [
      { id: 201, name: "Classic Burger", price: 199, description: "Beef patty with lettuce and tomato" },
      { id: 202, name: "Cheese Burger", price: 229, description: "With extra cheddar cheese" },
      { id: 203, name: "French Fries", price: 99, description: "Crispy golden fries" },
      { id: 204, name: "Chocolate Shake", price: 149, description: "Thick and creamy" }
    ]
  },
  {
    id: 3,
    name: "Sushi Stop",
    cuisine: "Japanese",
    rating: 4.7,
    deliveryTime: "40-50 min",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
    menu: [
      { id: 301, name: "Salmon Nigiri", price: 299, description: "Fresh salmon over rice" },
      { id: 302, name: "Tuna Roll", price: 349, description: "8 pieces of tuna maki" },
      { id: 303, name: "Edamame", price: 99, description: "Steamed and salted" },
      { id: 304, name: "Miso Soup", price: 79, description: "Traditional Japanese soup" }
    ]
  },
  {
    id: 4,
    name: "Taco Town",
    cuisine: "Mexican",
    rating: 4.3,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
    menu: [
      { id: 401, name: "Chicken Taco", price: 149, description: "Grilled chicken with salsa" },
      { id: 402, name: "Beef Burrito", price: 249, description: "Stuffed with beef and beans" },
      { id: 403, name: "Nachos", price: 179, description: "With cheese and jalapenos" },
      { id: 404, name: "Guacamole", price: 99, description: "Fresh avocado dip" }
    ]
  }
]

export default restaurants