const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

const { verifyToken } = require('../middleware/authMiddleware');
const axios = require('axios');
const FormData = require("form-data");
const cryptoJS = require("crypto-js");
const moment = require('moment');
const Cart = require("../models/Cart");

router.post("/", verifyToken, async (req, res) => {
    try {
        const { products, totalAmount, paymentMethod, address, phoneNumber } = req.body;

        // Validate required fields
        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }

        // Validate phone number format (simple validation)
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        const newOrder = new Order({
            user: req.user.id,
            products,
            totalAmount,
            paymentMethod,
            address,
            phoneNumber,
            status: "Pending"
        });

        const savedOrder = await newOrder.save();

        // Clear the cart after order is placed
        await Cart.findOneAndDelete({ userId: req.user.id });

        // Create a product list string for the WhatsApp message
        let productDetails = "";
        if (products && products.length > 0) {
            productDetails = "\n\n*Products:*\n";
            products.forEach((item, index) => {
                productDetails += `${index + 1}. ${item.product ? item.product.name : 'Product'} x ${item.quantity}\n`;
            });
        }

        // Send WhatsApp confirmation message
        const message = `🛒 *Order Confirmation*\n
✅ *Status:* Pending
💰 *Total Amount:* ${totalAmount} PKR
💳 *Payment Method:* ${paymentMethod}
📍 *Address:* ${address}
${productDetails}
Thank you for shopping with us!`;

        const form = new FormData();
        form.append("secret", process.env.WHATSAPP_API_SECRET);
        form.append("account", process.env.WHATSAPP_ACCOUNT_ID);
        form.append("recipient", phoneNumber);
        form.append("type", "text");
        form.append("message", message);
        form.append("priority", 1);

        try {
            await axios.post("https://smspro.pk/api/send/whatsapp", form, {
                headers: form.getHeaders()
            });
        } catch (error) {
            console.error("Error sending WhatsApp message:", error.message);
            // Don't fail the order if WhatsApp message fails
        }

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
});

// Get all orders (Admin only)
router.get("/", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

// Get a user's orders (User must be authenticated)
router.get("/my-orders", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate(
            "products.product",
            "name price"
        );

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Error fetching user orders", error });
    }
});

// Update order status (Admin only)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
    }
});

// Delete an order (Admin only)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
});

// JazzCash Payment Route
router.post("/jazzcash", verifyToken, async (req, res) => {
    try {
        const { products, totalAmount, address, phoneNumber, accountNumber, transactionId } = req.body;

        // Validate required fields
        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }

        // Validate transaction details for JazzCash
        if (!accountNumber) {
            return res.status(400).json({ message: "Account number is required for JazzCash payment" });
        }

        if (!transactionId) {
            return res.status(400).json({ message: "Transaction ID is required for JazzCash payment" });
        }

        // Validate phone number format
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        // If direct transaction ID is provided, we can skip the JazzCash API call
        // and just record the manual transaction details
        if (transactionId) {
            // Save order with payment details
            const newOrder = new Order({
                user: req.user.id,
                products,
                totalAmount,
                paymentMethod: "JazzCash",
                address,
                phoneNumber,
                transactionId,
                paymentStatus: "Completed",
                accountNumber
            });

            const savedOrder = await newOrder.save();
            
            // Clear the cart after order is placed
            await Cart.findOneAndDelete({ userId: req.user.id });
            
            return res.status(201).json(savedOrder);
        }

        // Otherwise proceed with JazzCash API integration
        try {
            const url = 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/4.0/purchase/transaction';
            const merchantId = process.env.JAZZ_MERCHANT_ID;
            const password = process.env.JAZZ_PASSWORD;
            const integritySalt = process.env.JAZZ_INTEGRITY_SALT;
            const txnRefNo = `TxnRef${moment().format('YYYYMMDDHHmmss')}`;
            const txnDateTime = moment().format('YYYYMMDDHHmmss');
            const messageHash = [integritySalt, totalAmount, txnRefNo, txnDateTime, merchantId, password].join("&");
            const secureHash = cryptoJS.HmacSHA256(messageHash, integritySalt).toString().toUpperCase();

            const requestBody = {
                pp_MerchantID: merchantId,
                pp_Password: password,
                pp_TxnRefNo: txnRefNo,
                pp_Amount: totalAmount,
                pp_TxnCurrency: "PKR",
                pp_TxnDateTime: txnDateTime,
                pp_BillReference: "billRef123",
                pp_Description: "Order Payment",
                pp_SecureHash: secureHash,
                pp_MobileNo: phoneNumber,
            };

            const response = await axios.post(url, requestBody);
            
            // Assuming the response contains a transaction ID and status
            const apiTransactionId = response.data.transactionId || txnRefNo; // Fallback
            const paymentStatus = response.data.status || "Pending"; // Fallback

            // Save order with payment details
            const newOrder = new Order({
                user: req.user.id,
                products,
                totalAmount,
                paymentMethod: "JazzCash",
                address,
                phoneNumber,
                transactionId: apiTransactionId,
                paymentStatus,
                accountNumber
            });

            const savedOrder = await newOrder.save();
            
            // Clear the cart after order is placed
            await Cart.findOneAndDelete({ userId: req.user.id });
            
            res.status(201).json(savedOrder);
        } catch (apiError) {
            console.error("Error with JazzCash API:", apiError);
            return res.status(502).json({ message: "Error communicating with payment provider", error: apiError.message });
        }
    } catch (error) {
        console.error("Error processing JazzCash payment:", error);
        res.status(500).json({ message: "Payment processing failed", error: error.message });
    }
});

// EasyPaisa Payment Route
router.post("/easypaisa", verifyToken, async (req, res) => {
    try {
        const { products, totalAmount, address, phoneNumber, accountNumber, transactionId } = req.body;

        // Validate required fields
        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }

        // Validate transaction details for EasyPaisa
        if (!accountNumber) {
            return res.status(400).json({ message: "Account number is required for EasyPaisa payment" });
        }

        if (!transactionId) {
            return res.status(400).json({ message: "Transaction ID is required for EasyPaisa payment" });
        }

        // Validate phone number format
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        // If direct transaction ID is provided, we can skip the EasyPaisa API call
        // and just record the manual transaction details
        if (transactionId) {
            // Save order with payment details
            const newOrder = new Order({
                user: req.user.id,
                products,
                totalAmount,
                paymentMethod: "EasyPaisa",
                address,
                phoneNumber,
                transactionId,
                paymentStatus: "Completed",
                accountNumber
            });

            const savedOrder = await newOrder.save();
            
            // Clear the cart after order is placed
            await Cart.findOneAndDelete({ userId: req.user.id });
            
            return res.status(201).json(savedOrder);
        }

        // Otherwise proceed with EasyPaisa API integration
        try {
            const url = 'https://api.easypaisa.com.pk/v1/payment'; // Adjust the URL as needed
            const merchantId = process.env.EASYPAISA_MERCHANT_ID;
            const password = process.env.EASYPAISA_PASSWORD;
            const txnRefNo = `TxnRef${moment().format('YYYYMMDDHHmmss')}`;

            const requestBody = {
                merchantId,
                password,
                txnRefNo,
                amount: totalAmount,
                phoneNumber,
                // Add other required fields
            };

            const response = await axios.post(url, requestBody);
            
            // Assuming the response contains a transaction ID and status
            const apiTransactionId = response.data.transactionId || txnRefNo; // Fallback
            const paymentStatus = response.data.status || "Pending"; // Fallback

            // Save order with payment details
            const newOrder = new Order({
                user: req.user.id,
                products,
                totalAmount,
                paymentMethod: "EasyPaisa",
                address,
                phoneNumber,
                transactionId: apiTransactionId,
                paymentStatus,
                accountNumber
            });

            const savedOrder = await newOrder.save();
            
            // Clear the cart after order is placed
            await Cart.findOneAndDelete({ userId: req.user.id });
            
            res.status(201).json(savedOrder);
        } catch (apiError) {
            console.error("Error with EasyPaisa API:", apiError);
            return res.status(502).json({ message: "Error communicating with payment provider", error: apiError.message });
        }
    } catch (error) {
        console.error("Error processing EasyPaisa payment:", error);
        res.status(500).json({ message: "Payment processing failed", error: error.message });
    }
});

module.exports = router;