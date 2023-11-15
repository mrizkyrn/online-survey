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

const exampleRequset = {
   "survey": {
      "name": "Survey 1",
      "description": "This is the first survey",
      "startDate": "2021-01-01T00:00:00.000Z",
      "endDate": "2021-01-31T00:00:00.000Z"
   },
   "questions": [
      {
         "question": "What is your favorite color?",
         "type": "multiple-choice",
         "isRequired": true,
         "options": [
            "Red",
            "Blue",
            "Green"
         ]
      },
      {
         "question": "What is your favorite food?",
         "type": "checkboxes",
         "isRequired": true,
         "options": [
            "Pizza",
            "Pasta",
            "Burger",
            "Salad",
            "Fries"
         ]
      },
      {
         "question": "What is your favorite animal?",
         "type": "short-answer",
         "isRequired": true,
         "options": []
      }
   ]
};