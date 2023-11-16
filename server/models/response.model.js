import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema(
   {
      response: {
         type: mongoose.Schema.Types.Mixed,
         required: true,
      },
      questionId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Question',
      },
      surveyId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Survey',
      },
   },
   {
      timestamps: true,
   }
);

const Response = mongoose.model('Response', responseSchema);

export default Response;