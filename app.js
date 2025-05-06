const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const commentRoutes = require('./routes/commentRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse incoming JSON requests

// Register Routes
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', taskRoutes);
app.use('/api', commentRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB Connection Setup
const mongoURI = process.env.MONGO_URI; // Ensure MONGO_URI is set in your .env file

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
