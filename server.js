import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import appRoutes from './routes/appRoutes.js';
import cors from "cors"
import connectCloudinary from './config/cloudinaryConfig.js';
// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
connectCloudinary()

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the app routes
app.use('/api', appRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});