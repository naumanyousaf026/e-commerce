const express = require('express');
const Product = require('../Models/Product');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Route to add a new product
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { name, title, price, details, category, rating, discount } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newProduct = new Product({ name, title, price, details, category, rating, discount, image: imagePath });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID
router.get("/details/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Update a product by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, title, price, details, category, rating, discount } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, title, price, details, category, rating, discount, ...(imagePath && { image: imagePath }) },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Error-handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(500).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
});

module.exports = router;
