
const signupmodel = require("../Model/Signupmode");
const bcrypt = require("bcrypt");

// Login controller
const logincheck = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).send({ status: 0, message: "Email and password are required" });
        }

        // Find user by email
        const user = await signupmodel.findOne({ email: email });
        
        if (!user) {
            return res.status(404).send({ status: 0, message: "User not found" });
        }

        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).send({ status: 0, message: "Incorrect password" });
        }

        // If password matches, create user object without sensitive data
        const userObj = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        // Login successful
        res.send({ status: 1, message: "Login successful", user: userObj });
        
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ status: 0, message: "Server error", error: error.message });
    }
};

module.exports = logincheck;