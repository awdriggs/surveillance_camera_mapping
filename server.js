import express from 'express';
import mongoose from 'mongoose';
import locationRoutes from './routes/locationRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import dotenv from 'dotenv';

// Secrets
dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// console.log(username, password);
// DB Bizness
// import Location from './models/Location.js';
// const mongoURI = process.env.MONGO_URI;
// mongoose.connect(`mongodb+srv://${username}:${password}@undersurveillancedata.6wo4x.mongodb.net/?retryWrites=true&w=majority&appName=underSurveillanceData`)

console.log("testing connection");
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected with Mongoose'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); //Middleware for front-end content

// Use the location routes
app.use('/api', locationRoutes);

// Use the static routes 
app.use('/', homeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} bro`);
});


