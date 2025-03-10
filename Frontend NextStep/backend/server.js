const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB");
})



const User = require('./models/userModel');

async function insert() {
  
  await User.create({
    Name:'Mohsin',
    email:'mohsinpathan1352@gmail.com',
    Phone_no: 9265283529,
    City: 'Gandhinagar',
    State: 'Gujarat',
    Gender: 'Male',
    Date_of_Birth: 11/13/2001
  }); 
}

insert();

// Import Routes
const youngstersRoutes = require("./routes/youngsters");
const migrationRoutes = require("./routes/migration");
const opportunitiesRoutes = require("./routes/opportunities");
const cityRoutes = require("./routes/city");
const stateRoutes = require("./routes/state");
const instituteRoutes = require("./routes/institute");




// Middleware
app.use(cors());
app.use(bodyParser.json());

  

// API Routes
app.use("/api/youngsters", youngstersRoutes);
app.use("/api/migration", migrationRoutes);
app.use("/api/opportunities", opportunitiesRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/institute", instituteRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const path = require('path');

// Serve static files (React build) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Catch-all route to serve the React app for any unknown API routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
