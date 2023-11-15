import express from 'express';
import { create } from '../controller/survey.controller.js';

const router = express.Router();

router.post('/', create);
router.get('/', (req, res) => {
   res.send('Hello World');
});

export default router;
