import express from 'express';
// import { updateQuestionResponse } from '../controller/question.controller.js';
import { getAll } from '../controller/question.controller.js';

const router = express.Router();

// router.put('/:surveyId/questions', updateQuestionResponse);
router.get('/:surveyId/questions', getAll);

export default router;