
const bcrypt = require("bcrypt");
const signupmodel = require("../Model/Signupmode");

// Signup controller
const signupinsert = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        
        // Validate input
        if (!name || !email || !password || !confirmpassword) {
            return res.status(400).send({ status: 0, message: "All fields are required" });
        }
        
        if (password !== confirmpassword) {
            return res.status(400).send({ status: 0, message: "Passwords do not match" });
        }
        
        // Check if user already exists
        const existingUser = await signupmodel.findOne({ email: email });
        if (existingUser) {
            return res.status(409).send({ status: 0, message: "Email already registered" });
        }
        
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create new user with hashed password
        const newUser = new signupmodel({
            name,
            email,
            password: hashedPassword,
            confirmpassword: hashedPassword // Ideally, don't store this in DB
        });
        
        // Save the user
        const savedUser = await newUser.save();
        
        // Create response object without password
        const respObj = {
            id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email
        };
        
        res.status(201).send({ status: 1, message: "Signup successful", user: respObj });
        
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send({ status: 0, message: "Server error", error: error.message });
    }
};

module.exports = { signupinsert };