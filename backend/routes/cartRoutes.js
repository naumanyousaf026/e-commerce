const express = require('express');
const router = express.Router();
const Cart = require('../Models/Cart');
const Product = require('../Models/Product'); // Adjust path if needed

const { verifyToken } = require('../middleware/authMiddleware'); // Import the middleware

// Get cart for the logged-in user
router.get("/", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id })
            .populate("products.productId");

        // console.log("Cart from DB:", cart); // Debugging

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: error.message });
    }
});


// Add a product to the cart
router.post('/add-to-cart', verifyToken, async (req, res) => {
    try {
        const { productId, quantity, discountedPrice } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            // If no cart exists, create a new cart
            cart = new Cart({
                userId: req.user.id,
                products: [{ productId, quantity }],
                totalAmount: discountedPrice * quantity, // Use discounted price
            });
        } else {
            // If cart exists, update it
            const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);

            if (existingProductIndex > -1) {
                // If product exists in cart, update quantity
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                // If product does not exist, add it to cart
                cart.products.push({ productId, quantity });
            }

            // Recalculate totalAmount using discounted price
            cart.totalAmount += discountedPrice * quantity;
        }

        // Save cart to database
        await cart.save();

        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error("Error in add-to-cart:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Remove a product from the cart
router.delete('/:productId', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Find the product in the cart
        const productIndex = cart.products.findIndex(item => item.productId.toString() === req.params.productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Get product details to find the discounted price
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Calculate the discounted price
        const discountedPrice = product.discount
            ? product.price - (product.price * product.discount) / 100
            : product.price;

        // Subtract from totalAmount using the discounted price
        cart.totalAmount -= discountedPrice * cart.products[productIndex].quantity;

        // Remove product from cart
        cart.products.splice(productIndex, 1);

        // Delete cart if empty
        if (cart.products.length === 0) {
            await Cart.findOneAndDelete({ userId: req.user.id });
            return res.json({ message: 'Cart emptied successfully' });
        }

        await cart.save();
        res.json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Clear the cart
router.delete('/', verifyToken, async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.user.id });
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
