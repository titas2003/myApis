// routes/products.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../model/Product');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Destination folder for storing uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    }
});

const upload = multer({ storage: storage });

// Route to create a new product
router.post('/newproduct', upload.single('image'), async (req, res) => {
    const { category, name, detail, price, image } = req.body;
    const imagePath = req.file ? req.file.path : null; // Get the path of the uploaded image

    try {
        // Save product details to MongoDB Atlas    
        const product = new Product({
            category,
            name,
            detail,
            price,
            image: imagePath
        });
        await product.save();

        res.json(product); // Send back the saved product details
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(500).json({ error: 'Error saving product' });
    }
});

module.exports = router;
