const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const router = express.Router();

// Function to format phone number
const formatPhoneNumber = (phone) => {
  if (!phone.startsWith("+92")) {
    return `+92${phone.replace(/^\+/, "")}`;
  }
  return phone;
};

// User registration route
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const formattedPhone = formatPhoneNumber(phone);

    // Check if user already exists
    const existingUser = await User.findOne({ phone: formattedPhone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already in use" });
    }

    const newUser = new User({
      name, 
      email,
      phone: formattedPhone,
      password, // Hashing happens in the schema pre-save hook
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error: error.message });
  }
});

// User login route
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    const formattedPhone = formatPhoneNumber(phone);
    const user = await User.findOne({ phone: formattedPhone });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Debugging: Check stored user data
    // console.log("User Found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    
    // Debugging: Check password match
    // console.log("Entered Password:", password);
    // console.log("Stored Hashed Password:", user.password);
    // console.log("Password Match:", isMatch);
    

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});


// Change Password Route
router.post("/change-password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send({ error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { phone, newPassword } = req.body;
  const formattedPhone = formatPhoneNumber(phone);

  try {
    const user = await User.findOne({ phone: formattedPhone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword; // Assign directly; hashing is handled in pre-save hook
    user.resetOtp = null;
    user.otpExpires = null;

    await user.save();

    console.log("Updated Password:", user.password);
    
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


const otpExpiryTime = 2 * 60 * 1000; // 2 minutes

router.post("/forgot-password", async (req, res) => {
  const { phone } = req.body;
  const formattedPhone = formatPhoneNumber(phone);

  try {
    const user = await User.findOne({ phone: formattedPhone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = new Date(Date.now() + otpExpiryTime);
    await user.save();

    const params = {
      secret: "e7d0098a46e0af84f43c2b240af5984ae267e08d",
      type: "sms",
      mode: "devices",
      device: "e6138de1-be1b-2ff1-8685-380463973378",
      sim: 1,
      phone: formattedPhone,
      message: `Your OTP is ${otp}`,
    };

    const otpResponse = await axios.get("https://smspro.pk/api/send/otp", { params });

    if (otpResponse.data.status === 200) {
      res.json({ message: "OTP sent successfully" });
    } else {
      res.status(400).json({ message: "Failed to send OTP via SMS" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Resend OTP
router.post("/resend-otp", async (req, res) => {
  const { phone } = req.body;
  const formattedPhone = formatPhoneNumber(phone);

  try {
    const user = await User.findOne({ phone: formattedPhone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    const params = {
      secret: "e7d0098a46e0af84f43c2b240af5984ae267e08d",
      type: "sms",
      mode: "devices",
      device: "e6138de1-be1b-2ff1-8685-380463973378",
      sim: 1,
      phone: formattedPhone,
      message: `Your new OTP is ${otp}`,
    };

    const otpResponse = await axios.get("https://smspro.pk/api/send/otp", { params });

    if (otpResponse.data.status === 200) {
      res.json({ message: "OTP resent successfully" });
    } else {
      res.status(400).json({ message: "Failed to resend OTP via SMS" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  // ✅ Check if phone and OTP exist
  if (!phone || !otp) {
    return res.status(400).json({ message: "Phone number and OTP are required." });
  }

  // ✅ Check if OTP is exactly 4 digits
  if (otp.length !== 4) {
    return res.status(400).json({ message: "OTP must be 4 digits." });
  }

  try {
    const user = await User.findOne({ phone });

    // ✅ Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // ✅ Check if OTP matches
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // ✅ Check if OTP is expired
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired." });
    }

    // OTP verification successful
    user.resetOtp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully." });

  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
});
// Assuming you have a User model and a middleware to verify the token
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the token
    const user = await User.findById(userId).select('name email phone address'); // Select only the fields you need

    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json({ valid: true });
});



module.exports = router;
