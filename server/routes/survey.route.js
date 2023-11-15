import express from 'express';
import { createWithQuestions, getAll } from '../controller/survey.controller.js';

const router = express.Router();

router.post('/', createWithQuestions);
router.get('/', getAll);

export default router;
