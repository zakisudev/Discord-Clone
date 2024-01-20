require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');

// Connect to database
connectDB();
// Initialize express
const app = express();

// cors middleware
app.use(cors());
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
