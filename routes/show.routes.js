import express from 'express';
import { createShow, getShows, updateShow, deleteShow } from '../controllers/show.controller.js';
const router = express.Router();

router.post('/shows', createShow);
router.get('/shows', getShows);
router.patch('/shows/:id', updateShow);
router.delete('/shows/:id', deleteShow);

export default router;
