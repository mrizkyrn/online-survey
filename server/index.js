import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import surveyRoutes from './routes/survey.route.js';
import questionRoutes from './routes/question.route.js';
import responseRoutes from './routes/response.route.js';

dotenv.config({ path: '../.env' });

mongoose
   .connect(process.env.MONGO_URL)
   .then(() => {
      console.log('Connected to MongoDB');
   })
   .catch((error) => {
      console.log(error);
   });

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
   console.log('Server running on port 3000');
});

app.get('/', (req, res) => {
   res.send('Hello World!');
});

// Routes
app.use('/api/surveys', surveyRoutes);
app.use('/api', questionRoutes);
app.use('/api/responses', responseRoutes);

// Middleware
app.use((error, req, res, next) => {
   const statusCode = error.statusCode || 500;
   const message = error.message || 'Internal server error';

   res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   });
});
