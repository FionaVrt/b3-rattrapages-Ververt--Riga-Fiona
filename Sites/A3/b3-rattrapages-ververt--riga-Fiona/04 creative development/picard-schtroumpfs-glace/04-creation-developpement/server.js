const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Product data
const iceData = {
    name: "Smurf Blackberry Water Ice",
    description: "An explosion of blackberry flavor in a magical Smurf blue water ice!",
    color: "#4169E1",
    ingredients: [
        "Purified spring water",
        "Concentrated blackberry juice",
        "Cane sugar",
        "Natural blue coloring",
        "Natural blackberry flavor",
        "A touch of Smurf magic ✨"
    ],
    nutritional_values: {
        calories: "45 kcal/100ml",
        sugars: "11g/100ml",
        fats: "0g",
        additives: "No preservatives"
    },
    price: "3.99€",
    stock: 156,
    rating: 4.8,
    reviews: [
        { name: "Greedy Smurf", comment: "Smurfingly delicious!", rating: 5 },
        { name: "Marie L.", comment: "My children love it, the taste is authentic!", rating: 5 },
        { name: "Brainy Smurf", comment: "Perfect color and refreshing taste.", rating: 4 }
    ]
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { ice: iceData });
});

// API for ordering
app.post('/api/order', (req, res) => {
    const { quantity } = req.body;

    if (quantity && quantity > 0 && quantity <= iceData.stock) {
        iceData.stock -= quantity;
        res.json({
            success: true,
            message: `Smurfingly ordered! ${quantity} ice(s) added to cart.`,
            newStock: iceData.stock
        });
    } else {
        res.json({
            success: false,
            message: "Invalid quantity or insufficient stock!"
        });
    }
});

// Server startup
app.listen(PORT, () => {
    console.log(`🧊 Smurf Server started on http://localhost:${PORT}`);
    console.log('Ready to serve smurfy ices! 🔵');
});