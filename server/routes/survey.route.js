import express from 'express';
import { create, createWithQuestions, getAll, getById, updateWithQuestions } from '../controller/survey.controller.js';

const router = express.Router();

router.post('/', createWithQuestions);
router.get('/', getAll);
router.get('/:surveyId', getById);
router.put('/:surveyId', updateWithQuestions);

export default router;
