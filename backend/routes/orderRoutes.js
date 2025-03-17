const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
// const User = require("../Models/User");
// const Product = require("../Models/Product");
// const Cart = require("../Models/Cart");
const { verifyToken } = require('../middleware/authMiddleware');
const axios = require('axios');
const FormData = require("form-data");

router.post("/", verifyToken, async (req, res) => {
    try {
        const { products, totalAmount, paymentMethod, address, phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ message: "phoneNumber is required" });
        }

        const newOrder = new Order({
            user: req.user.id,
            products,
            totalAmount,
            paymentMethod,
            address,
            phoneNumber, // Save phone number in the order
            status: "Pending" // Default status
        });

        const savedOrder = await newOrder.save();

        // Format the WhatsApp message
        const message = `🛒 *Order Confirmation*\n
✅ *Status:* Pending
💰 *Total Amount:* ${totalAmount} PKR
💳 *Payment Method:* ${paymentMethod}
📍 *Address:* ${address}

Thank you for shopping with us!`;

        // Prepare the form data
        const form = new FormData();
        form.append("secret", process.env.WHATSAPP_API_SECRET); // Use env variable
        form.append("account", process.env.WHATSAPP_ACCOUNT_ID); // Use env variable
        form.append("recipient", phoneNumber); // Use the phone number from the frontend
        form.append("type", "text");
        form.append("message", message);
        form.append("priority", 1); // Set priority to 1

        try {
            const response = await axios.post("https://smspro.pk/api/send/whatsapp", form, {
                headers: form.getHeaders()
            });
            // console.log("WhatsApp API Response:", response.data);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error("Error sending WhatsApp message:", error.response.data);
                return res.status(500).json({ message: "Failed to send WhatsApp message", error: error.response.data });
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from WhatsApp API:", error.request);
                return res.status(500).json({ message: "No response from WhatsApp API" });
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error in sending request:", error.message);
                return res.status(500).json({ message: "Error in sending request", error: error.message });
            }
        }

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
});

// Get all orders (Admin only)
router.get("/",verifyToken, async (req, res) => {
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
    // console.log("User ID from Token:", req.user.id);

    const orders = await Order.find({ user: req.user.id }).populate(
      "products.product",
      "name price"
    );

    // console.log("Orders Found:", orders); // Debugging

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

module.exports = router;
