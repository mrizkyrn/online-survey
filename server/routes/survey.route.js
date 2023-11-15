import express from 'express';
import { createWithQuestions } from '../controller/survey.controller.js';

const router = express.Router();

router.post('/', createWithQuestions);
// router.put('/:id', update);

export default router;
