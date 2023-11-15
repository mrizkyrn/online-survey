import Survey from '../models/survey.model.js';
import Question from '../models/question.model.js';

export const createWithQuestions = async (req, res, next) => {
   try {
      const { survey, questions } = req.body;

      const newSurvey = new Survey(survey);
      const createdSurvey = await newSurvey.save();

      const newQuestions = questions.map((question) => {
         return new Question(question);
      });

      console.log(newQuestions);

      const createdQuestions = await Question.insertMany(newQuestions);

      createdQuestions.forEach((question) => {
         createdSurvey.questions.push(question._id);
      });

      await createdSurvey.save();

      res.status(201).json({
         success: true,
         data: createdSurvey,
      });
   } catch (error) {
      next(error);
   }
};

export const getAll = async (req, res, next) => {
   try {
      const surveys = await Survey.find().populate('questions');

      res.status(200).json({
         success: true,
         data: surveys,
      });
   } catch (error) {
      next(error);
   }
};
