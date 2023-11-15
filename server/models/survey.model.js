import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
      },
      startDate: {
         type: Date,
         required: true,
      },
      endDate: {
         type: Date,
         required: true,
      },
      questions: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
         },
      ],
   },
   {
      timestamps: true,
   }
);

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;

const dummySurvey = {
   "name": "Survey 1",
   "description": "This is the first survey",
   "startDate": "2021-01-01T00:00:00.000Z",
   "endDate": "2021-01-31T00:00:00.000Z",
   "questions": []
};

