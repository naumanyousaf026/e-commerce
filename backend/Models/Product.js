const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String}, // Added title field
  price: { type: Number, required: true },
  details: { type: String, required: true },
  image: { type: String },
  category: { 
    type: String, 
    required: true, 
    enum: ["product", "beautyWorld", "offerCollection", "cosmetics", "bestProduct", "megaCollection"] 
  }, // Ensure 'category' is defined and required
  rating: { type: Number, min: 1, max: 5 }, // Added rating field
  discount: { type: Number, default: null } // Added discount field
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
