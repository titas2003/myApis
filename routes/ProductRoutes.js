// routes/products.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../model/Product');
const Category = require('../model/Category');

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
    // const { category, name, detail, price, image } = req.body;
    // const imagePath = req.file ? req.file.path : null; // Get the path of the uploaded image
    // const { cate } = req.body.category;

    // try {
    //     // Save product details to MongoDB Atlas    
    //     const product = new Product({
    //         category,
    //         name,
    //         detail,
    //         price,
    //         image: imagePath
    //     });
    //     const category = new Category({
    //         cate
    //     })
    //     await category.save();
    //     await product.save();
        

    //     res.json({product,category}); // Send back the saved product details
    // } catch (err) {
    //     console.error('Error saving product:', err);
    //     res.status(500).json({ error: 'Error saving product' });
    // }

    try {
        const {categoryName, name, detail, price, image} = req.body;

        let category = await Category.findOne({ name: categoryName });

        if(!category) {
            category = await Category.create({name: categoryName});
        }

        const newProduct = new Product({
            category: category._id,
            name,
            detail,
            price,
            image
        });

        const savedProduct = await newProduct.save();
        
        res.status(201).json(savedProduct);
    } catch (error) {
            console.error('Error inserting product:');
            res.status(500).json({ error: 'Error inserting product' });
        }
        
    
});

module.exports = router;
