import express from 'express';
import { getLocations, addLocation } from '../controllers/locationControllers.js';

const router = express.Router();

// Route to get all users
router.get('/locations', getLocations);

// Route for creating a new user
router.post('/locations', addLocation);

// Route to get a user by type 
// router.get('/locations/:type', getLocationsByType);

export default router;
