const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
    {
        State_ID: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true, // Automatically generates ObjectId
            primaryKey: true,
        },
        State_Name: {
            type: String,
            required: true,
            unique: true,
            trim: true, // Removes leading/trailing spaces
        }
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports  = mongoose.model("State", stateSchema);