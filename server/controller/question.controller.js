import Question from '../models/question.model.js';
import Response from '../models/response.model.js';

// get all question and its responses for a survey
export const getAll = async (req, res, next) => {
   const { surveyId } = req.params;

   try {
      const questions = await Question.find({ survey: surveyId }).populate('responses');
      console.log(questions);

      res.status(200).json({ success: true, data: questions });
   }
   catch (error) {
      next(error);
   }
}


