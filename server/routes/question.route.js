import express from 'express';
import { updateQuestionResponse } from '../controller/question.controller.js';

const router = express.Router();

router.put('/:surveyId/questions', updateQuestionResponse);

export default router;