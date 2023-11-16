import Response from '../models/response.model.js';
import Question from '../models/question.model.js';

export const createResponses = async (req, res, next) => {
   const { responses } = req.body;

   try {
      const newResponses = await Response.insertMany(responses);
      const questionIds = newResponses.map((response) => response.questionId);
      const questions = await Question.find({ _id: { $in: questionIds } });

      questions.forEach((question) => {
         const newResponsesIds = newResponses
            .filter((response) => response.questionId.toString() === question._id.toString())
            .map((response) => response._id);
         question.responses.push(...newResponsesIds);
      });
      await Promise.all(questions.map((question) => question.save()));

      res.status(201).json({ success: true, data: newResponses });
   } catch (error) {
      next(error);
   }
};
