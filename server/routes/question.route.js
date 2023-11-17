import express from 'express';
import { getAll } from '../controller/question.controller.js';

const router = express.Router();

router.get('/:surveyId/questions', getAll);

export default router;