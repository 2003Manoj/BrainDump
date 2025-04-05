
const bcrypt = require("bcrypt"); // For password hashing (you'll need to install this)
const signupmodel = require("../Model/Signupmode");

// Find user by email for password reset
let findpass = async(req, res) => {
    try {
        // Get email from request body
        let email = req.body.email;
        
        if (!email) {
            return res.status(400).send({status: 0, message: "Email is required"});
        }
        
        // Find user by email
        let user = await signupmodel.findOne({email: email});
        
        if (!user) {
            return res.status(404).send({status: 0, message: "Email not found"});
        }
        
        // Return user info without sensitive data
        let obj = {
            id: user._id,
            name: user.name,
            email: user.email
            // Don't include password in response
        };
        
        res.send({status: 1, message: "User found successfully", res: obj});
    } catch (err) {
        console.error("Find user error:", err);
        res.status(500).send({status: 0, message: "Server error", error: err.message});
    }
};

// Update password
let forgotpassword = async(req, res) => {
    try {
        let { email, password, confirmpassword } = req.body;
        
        if (!email) {
            return res.status(400).send({status: 0, message: "Email is required"});
        }
        
        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).send({status: 0, message: "Passwords do not match"});
        }
        
        // Find user first to ensure they exist
        const user = await signupmodel.findOne({ email: email });
        
        if (!user) {
            return res.status(404).send({status: 0, message: "User not found"});
        }
        
        // Hash the password (you should be using bcrypt in your app)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Update password fields with hashed password
        const updateobj = {
            password: hashedPassword,
            confirmpassword: hashedPassword // Ideally, you shouldn't store confirmPassword in the database
        };
        
        const newsetpass = await signupmodel.updateOne({ email: email }, updateobj);
        
        if (newsetpass.modifiedCount === 0) {
            return res.status(400).send({status: 0, message: "Password unchanged"});
        }
        
        res.send({status: 1, message: "Password updated successfully"});
    } catch (err) {
        console.error("Password reset error:", err);
        res.status(500).send({status: 0, message: "Server error", error: err.message});
    }
};

module.exports = {findpass, forgotpassword};