import Question from "../models/question.model.js";
import Survey from "../models/survey.model.js";

export const updateQuestionResponse = async (req, res, next) => {
   const { surveyId } = req.params;
   const { responses } = req.body;

   console.log(surveyId);
   console.log(responses);

   try {
      const survey = await Survey.findById(surveyId);
      const questions = await Question.find({ _id: { $in: survey.questions } });

      questions.forEach((question) => {
         const response = responses[question._id];

         if (response) {
            question.responses.push(response);
         }
      });

      await Promise.all(questions.map((question) => question.save()));

      res.status(200).json({
         success: true,
         data: questions,
      });
   } catch (error) {
      next(error);
   }
}


   