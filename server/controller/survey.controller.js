import Survey from '../models/survey.model.js';
import Question from '../models/question.model.js';

export const createEmpty = async (req, res, next) => {
   try {
      const newSurvey = new Survey({ ...req.body });
      const createdSurvey = await newSurvey.save();

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
   try {
      const { survey, questions } = req.body;
      const { surveyId } = req.params;

      const updatedSurvey = await Survey.findByIdAndUpdate(surveyId, survey, { new: true });

      const updatedQuestions = await Promise.all(
         questions.map(async (question) => {
            if (question._id) {
               await Question.findByIdAndUpdate(question._id, question, { new: true });
               return question;
            } else {
               const newQuestion = new Question(question);
               await newQuestion.save();
               return newQuestion;
            }
         })
      );

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
