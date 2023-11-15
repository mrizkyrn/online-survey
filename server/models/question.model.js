import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
   {
      question: {
         type: String,
         required: true,
      },
      type: {
         type: String,
         enum: ['short-answer', 'long-answer', 'multiple-choice', 'checkboxes', 'rating'],
         default: 'short-answer',
         required: true,
      },
      isRequired: {
         type: Boolean,
         default: false,
      },
      options: [
         {
            type: String,
         },
      ],
   },
);

const Question = mongoose.model('Question', questionSchema);

export default Question;

// const dummyQuestion = {
//    "question": "What is your name?",
//    "type": "short-answer",
//    "isRequired": true,
//    "options": []
// };