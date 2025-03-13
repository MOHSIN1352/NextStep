const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    User_ID: { 
        type: mongoose.Schema.Types.ObjectId, 
        auto: true 
    },
    Name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    Phone_no: { 
        type: String, 
        required: true, 
        unique: true 
    },
    City: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "City", 
        required: true 
    },
    State: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "State", 
        required: true 
    },
    Gender: { 
        type: String, 
        required: true, 
        enum: ["male", "female", "other"] 
    },
    Date_of_Birth: { 
        type: Date, 
        required: true 
    },
    password: 
    
    { type: String, 
    required: true },
});

module.exports = mongoose.model("User", userSchema);
