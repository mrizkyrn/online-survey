/* eslint-disable no-unused-vars */
import { useState } from 'react';
import BackButton from '../components/BackButton';
import QuestionCard from '../components/QuestionCard';

const CreateSurvey = () => {
   const [survey, setSurvey] = useState({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
   });
   const [questions, setQuestions] = useState([ ]);

   const isValid = () => {
      if (survey.name === '') return false;
      if (survey.description === '') return false;
      if (survey.startDate === '') return false;
      if (survey.endDate === '') return false;

      for (const question of questions) {
         if (question.question === '') return false;
         if (question.type === '') return false;
      }

      return true;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!isValid()) {
         alert('Please fill out all the fields');
         return;
      }
      
      const questionsWithoutId = questions.map(({ _id, ...rest }) => rest);

      const questionsWithOptions = questionsWithoutId.map((question) => {
         if (question.type !== 'multiple-choice' && question.type !== 'checkboxes') {
            return { ...question, options: [] };
         }
         return question;
      });

      try {
         const res = await fetch('http://localhost:3000/api/surveys', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               survey,
               questions: questionsWithOptions,
            }),
         });
         const data = await res.json();
         console.log(data);
      } catch (err) {
         console.log(err);
      }
   };

   const handleAddQuestion = () => {
      const newQuestion = {
         _id: new Date().getTime(),
         question: '',
         type: 'short-answer',
         isRequired: false,
         options: [],
      };

      setQuestions([...questions, newQuestion]);
   };

   const handleDeleteQuestion = (id) => {
      const newQuestions = questions.filter((question) => question._id !== id);
      setQuestions(newQuestions);
   };

   const handleQuestionChange = (id, field, value) => {
      const newQuestions = questions.map((question) => {
         if (question._id === id) {
            return { ...question, [field]: value };
         }
         return question;
      });
      setQuestions(newQuestions);
   };

   return (
      <div className="bg-semiDark">
         <div>
            <BackButton />
            <h1 className="inline text-3xl font-semibold text-gray-200 ml-2">Create Survey</h1>
         </div>

         <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-2">
               <label htmlFor="name" className="text-gray-200">
                  Name *
               </label>
               <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter survey name"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                  onChange={(e) => setSurvey({ ...survey, name: e.target.value })}
               />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
               <label htmlFor="description" className="text-gray-200">
                  Description *
               </label>
               <textarea
                  name="description"
                  id="description"
                  placeholder="Enter survey description"
                  rows="3"
                  className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                  onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
               />
            </div>

            <div className="flex gap-5">
               {/* Start Date */}
               <div className="w-full flex flex-col gap-2">
                  <label htmlFor="startDate" className="text-gray-200">
                     Start Date *
                  </label>
                  <input
                     type="date"
                     name="startDate"
                     id="startDate"
                     placeholder="Enter start date"
                     className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                     onChange={(e) => setSurvey({ ...survey, startDate: e.target.value })}
                  />
               </div>

               {/* End Date */}
               <div className="w-full flex flex-col gap-2">
                  <label htmlFor="endDate" className="text-gray-200">
                     End Date *
                  </label>
                  <input
                     type="date"
                     name="endDate"
                     id="endDate"
                     placeholder="Enter end date"
                     className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                     onChange={(e) => setSurvey({ ...survey, endDate: e.target.value })}
                  />
               </div>
            </div>

            {/* Questions */}
            <h1 className="text-xl font-semibold text-gray-200 mt-4">Questions</h1>
            {questions.map((question) => (
               <QuestionCard
                  key={question._id}
                  question={question}
                  onDelete={() => handleDeleteQuestion(question._id)}
                  onQuestionChange={(field, value) => handleQuestionChange(question._id, field, value)}
               />
            ))}

            {/* Button Add Questions */}
            <div className="flex justify-center">
               <button
                  type="button"
                  className="text-light border border-light w-36 py-2 rounded-md font-semibold text-center mt-5"
                  onClick={handleAddQuestion}
               >
                  Add Questions
               </button>
            </div>

            {/* Submit */}
            <button
               type="submit"
               className="bg-[#415c8a] hover:bg-[#2d4369] px-5 py-2 rounded-md text-white font-semibold mt-5"
            >
               Create Task
            </button>
         </form>
      </div>
   );
};

export default CreateSurvey;
