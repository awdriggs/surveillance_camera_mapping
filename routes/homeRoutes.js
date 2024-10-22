import express from 'express';
import { getHome } from '../controllers/homeControllers.js';

const router = express.Router();

// Route to get all users
router.get('/', getHome);

export default router;

