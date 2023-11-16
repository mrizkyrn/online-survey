import express from 'express';
import { createWithQuestions, deleteWithQuestions, getAll, getAllQuestionsAndResponses, getById, updateWithQuestions } from '../controller/survey.controller.js';

const router = express.Router();

router.post('/', createWithQuestions);
router.get('/', getAll);
router.get('/:surveyId', getById);
router.put('/:surveyId', updateWithQuestions);
router.delete('/:surveyId', deleteWithQuestions);
router.get('/:surveyId/questions', getAllQuestionsAndResponses);

export default router;
