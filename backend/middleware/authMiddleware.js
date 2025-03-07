const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Make sure User model exists

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "Access Denied" });

    // Extract the token part after "Bearer "
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid Token Format" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
// ✅ Ensure verifyAdmin exists
const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Authorization error", error: error.message });
    }
};

module.exports = { verifyToken, verifyAdmin };
