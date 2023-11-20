import Question from '../models/question.model.js';
import Response from '../models/response.model.js';

export const getAll = async (req, res, next) => {
   const { surveyId } = req.params;
   let { type, isRequired, sortBy } = req.query;

   try {
      let query = { survey: surveyId };

      type = type ? type.split(',') : null;
      isRequired = isRequired ? isRequired.split(',').map((value) => JSON.parse(value)) : null;

      if (type) {
         query.type = { $in: type };
      }

      if (isRequired) {
         query.isRequired = { $in: isRequired };
      }
      
      sortBy = sortBy
         ? sortBy.split(',').map((field) => {
              const [key, order] = field.split(':');
              return [key, order === 'desc' ? 1 : -1];
           })
         : [['createdAt', -1]];
         
      const questions = await Question.find(query).sort(sortBy).populate('responses');

      res.status(200).json({
         success: true,
         data: questions,
      });
   } catch (error) {
      next(error);
   }
};
