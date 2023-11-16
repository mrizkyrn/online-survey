import express from 'express';
import { createResponses, getAll } from '../controller/response.controller.js';

const router = express.Router();

router.post('/', createResponses);
router.get('/:surveyId', getAll);

export default router;