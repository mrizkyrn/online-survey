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

export const getById = async (req, res, next) => {
   try {
      const { surveyId } = req.params;

      const survey = await Survey.findById(surveyId).populate('questions');

      res.status(200).json({
         success: true,
         data: survey,
      });
   } catch (error) {
      next(error);
   }
};

export const updateWithQuestions = async (req, res, next) => {
   console.log(req.body);
   try {
      const { survey, questions } = req.body;
      const { surveyId } = req.params;

      // Update survey details
      const updatedSurvey = await Survey.findByIdAndUpdate(surveyId, survey, { new: true });

      // Update or create questions
      const updatedQuestions = await Promise.all(
         questions.map(async (question) => {
            if (question._id) {
               // If question has an _id, update the existing question
               await Question.findByIdAndUpdate(question._id, question, { new: true });
               return question;
            } else {
               // If question doesn't have an _id, create a new question
               const newQuestion = new Question(question);
               await newQuestion.save();
               return newQuestion;
            }
         })
      );

      // Update survey's questions array with updated or new question IDs
      updatedSurvey.questions = updatedQuestions.map((question) => question._id);
      await updatedSurvey.save();

      res.status(200).json({
         success: true,
         data: updatedSurvey,
      });
   } catch (error) {
      next(error);
   }
};

export const deleteWithQuestions = async (req, res, next) => {
   try {
      const { surveyId } = req.params;

      const deletedSurvey = await Survey.findByIdAndDelete(surveyId);

      await Question.deleteMany({ _id: { $in: deletedSurvey.questions } });

      res.status(200).json({
         success: true,
         message: 'Survey and questions deleted successfully.',
      });
   } catch (error) {
      next(error);
   }
};

// get all questions and responses for a survey
export const getAllQuestionsAndResponses = async (req, res, next) => {
   const { surveyId } = req.params;

   try {
      const questions = await Survey.findById(surveyId).populate('questions').select('questions').populate('questions.responses');
      res.status(200).json({ success: true, data: questions });
   } catch (error) {
      next(error);
   }
};
