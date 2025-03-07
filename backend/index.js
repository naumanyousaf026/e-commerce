const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require('./Config/databases.js');
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/admin.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


require('dotenv').config();

const app = express();
app.use("/uploads", express.static("uploads"));
// Connect to database
connectDB();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
}));

// Middleware
app.use(express.urlencoded({ extended: true }));  // Changed `false` to `true` for nested objects
app.use(cookieParser());
app.use(express.json());


  
// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
