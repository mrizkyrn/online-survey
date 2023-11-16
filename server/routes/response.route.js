import express from 'express';
import { createResponses } from '../controller/response.controller.js';

const router = express.Router();

router.post('/', createResponses);

export default router;