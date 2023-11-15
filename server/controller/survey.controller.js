import Survey from '../models/survey.model.js';

export const create = async (req, res, next) => {
   try {
      const survey = new Survey(req.body);
      const createdSurvey = await survey.save();

      res.status(201).json({
         success: true,
         data: createdSurvey,
      });
   } catch (error) {
      next(error);
   }
};