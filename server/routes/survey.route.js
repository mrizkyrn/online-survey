import express from 'express';
import { createEmpty, deleteWithQuestions, getAll, getById, updateWithQuestions } from '../controller/survey.controller.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:surveyId', getById);
router.put('/:surveyId', updateWithQuestions);
router.post('/empty', createEmpty);
router.delete('/:surveyId', deleteWithQuestions);

export default router;
