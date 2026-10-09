import express from 'express';
import { healthChat, suggestSpecialist } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post("/health-chat", healthChat);
aiRouter.post("/suggest-specialist", suggestSpecialist);

export default aiRouter;
