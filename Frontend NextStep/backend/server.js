const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const generalRoutes = require('./routes/generalRoutes');
const stateRoutes = require('./routes/stateroutes');
const policyRoutes = require('./routes/policyRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const cityRoutes = require('./routes/cityRoutes');
const courseRoutes = require('./routes/courseRoutes');
const employerRoutes = require('./routes/employerRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const jobRoutes = require('./routes/JobRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Middleware
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/general', generalRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/state', stateRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/jobs', jobRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
