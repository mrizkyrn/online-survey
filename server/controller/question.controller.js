import Question from '../models/question.model.js';
import Survey from '../models/survey.model.js';

// export const create = async (req, res, next) => {
//    console.log(req.params);
//    try {
//       const { surveyId } = req.params;
//       const { question } = req.body;

//       const newQuestion = new Question(question);
//       const createdQuestion = await newQuestion.save();

//       const survey = await Survey.findById(surveyId);
//       survey.questions.push(createdQuestion._id);
//       await survey.save();

//       res.status(201).json({
//          success: true,
//          data: createdQuestion,
//       });
//    } catch (error) {
//       next(error);
//    }
// };
