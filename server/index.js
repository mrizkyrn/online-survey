const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

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

// Routes
app.get('/', (req, res, next) => {
   res.json({
      success: true,
      message: 'Hello world',
   });
});

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
