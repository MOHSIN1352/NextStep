const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema({
    User_ID: {
        type: Number,
        unique: true
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
        type: Number,
        required: true,
        unique: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    Date_of_Birth: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.User_ID) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: "user_id" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.User_ID = counter.seq;
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
