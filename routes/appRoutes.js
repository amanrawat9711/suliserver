import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { createAppEntry, deleteEntry, getAppEntry, getCard, getImages } from '../controllers/appController.js';

const router = express.Router();

// Define the create route
router.post('/create', upload.single("image"), createAppEntry);
router.get('/get-entries', getAppEntry);
router.get('/get-images', getImages);
router.get('/get-entry/:id', getCard);
router.post("/delete-entry/:id",deleteEntry)
export default router;