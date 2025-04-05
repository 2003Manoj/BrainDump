let mongoose = require('mongoose');  
let SignupSchema = new mongoose.Schema({
    name:{type: String,
        required: true
    },
  
    email:{type: String,
        required: true,
        unique: true
    },  
    password:{type: String,
        required: true,
        unique:true
    },
    confirmpassword:{type: String,
        required: true
    },
});
let signupmodel = mongoose.model('Signupdetails', SignupSchema);
module.exports = signupmodel;