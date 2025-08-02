const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Données produit
const glaceData = {
    nom: "Glace à l'eau Mûre Schtroumpf",
    description: "Une explosion de saveur mûre dans une glace à l'eau d'un bleu Schtroumpf magique !",
    couleur: "#4169E1",
    ingredients: [
        "Eau purifiée de source",
        "Jus de mûre concentré",
        "Sucre de canne",
        "Colorant naturel bleu",
        "Arôme naturel de mûre",
        "Un soupçon de magie Schtroumpf ✨"
    ],
    valeurs_nutritionnelles: {
        calories: "45 kcal/100ml",
        sucres: "11g/100ml",
        matieres_grasses: "0g",
        additifs: "Sans conservateurs"
    },
    prix: "3.99€",
    stock: 156,
    note: 4.8,
    avis: [
        { nom: "Schtroumpf Gourmand", commentaire: "Schtroumpfement délicieuse !", note: 5 },
        { nom: "Marie L.", commentaire: "Mes enfants adorent, le goût est authentique !", note: 5 },
        { nom: "Schtroumpf à Lunettes", commentaire: "La couleur est parfaite et le goût rafraîchissant.", note: 4 }
    ]
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { glace: glaceData });
});

// API pour la commande
app.post('/api/commander', (req, res) => {
    const { quantite } = req.body;

    if (quantite && quantite > 0 && quantite <= glaceData.stock) {
        glaceData.stock -= quantite;
        res.json({
            success: true,
            message: `Schtroumpfement commandé ! ${quantite} glace(s) ajoutée(s) au panier.`,
            nouveauStock: glaceData.stock
        });
    } else {
        res.json({
            success: false,
            message: "Quantité invalide ou stock insuffisant !"
        });
    }
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🧊 Serveur Schtroumpf démarré sur http://localhost:${PORT}`);
    console.log('Prêt à servir des glaces schtroumpfantes ! 🔵');
});