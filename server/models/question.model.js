import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
   {
      survey: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Survey',
      },
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
      responses: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Response',
         },
      ],
   },
   {
      toJSON: { virtuals: true },
   }
);

questionSchema.virtual('totalResponses').get(function () {
   return this.responses.length;
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
