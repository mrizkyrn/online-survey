import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';

const EditSurvey = () => {
   const { id } = useParams();
   const [survey, setSurvey] = useState({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
   });

   useEffect(() => {
      const getSurvey = async () => {
         const res = await fetch(`http://localhost:3000/api/surveys/${id}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         setSurvey(data.data);
      };
      getSurvey();
   }, [id]);

   const isValid = () => {
      if (survey.name === '') return false;
      if (survey.description === '') return false;
      if (survey.startDate === '') return false;
      if (survey.endDate === '') return false;

      for (const question of survey.question) {
         if (question.question === '') return false;
         if (question.type === '') return false;
      }

      return true;
   };

   const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
   };

   const handleDeleteQuestion = (questionId) => {
      setSurvey({
         ...survey,
         questions: survey.questions.filter((question) => question.id !== questionId),
      });
   };

   const handleQuestionChange = (questionId, field, value) => {
      setSurvey({
         ...survey,
         questions: survey.questions.map((question) => {
            if (question.id === questionId) {
               return { ...question, [field]: value };
            }
            return question;
         }),
      });
   };

   const handleAddQuestion = () => {

      const newQuestion = {
         id: Math.random().toString(36).substr(2, 9),
         question: '',
         type: 'short-answer',
         options: [],
      };
      setSurvey({ ...survey, questions: [...survey.questions, newQuestion] });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!isValid()) {
         alert('Please fill out all the fields');
         return;
      }

      console.log({
         survey: {
            name: survey.name,
            description: survey.description,
            startDate: survey.startDate,
            endDate: survey.endDate,
         },
         questions: survey.questions,
      });

      try {
         const res = await fetch(`http://localhost:3000/api/surveys/${id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               survey: {
                  name: survey.name,
                  description: survey.description,
                  startDate: survey.startDate,
                  endDate: survey.endDate,
               },
               questions: survey.questions,
            }),
         });
         const data = await res.json();
         console.log(data);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className="bg-semiDark">
         <div>
            <BackButton />
            <h1 className="inline text-3xl font-semibold text-gray-200 ml-2">Update Survey</h1>
         </div>

         {survey && (
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
                     value={survey.name}
                     onChange={(e) => setSurvey({ ...survey, name: e.target.value })}
                  />
               </div>

               {/* Description */}
               <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-gray-200">
                     Description *
                  </label>
                  <input
                     type="text"
                     name="description"
                     id="description"
                     placeholder="Enter survey description"
                     className="bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
                     value={survey.description}
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
                        value={formatDate(survey.startDate)}
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
                        value={formatDate(survey.endDate)}
                        onChange={(e) => setSurvey({ ...survey, endDate: e.target.value })}
                     />
                  </div>
               </div>

               {/* Questions */}
               <h1 className="text-xl font-semibold text-gray-200 mt-4">Questions</h1>
               {survey.questions &&
                  survey.questions.map((question) => (
                     <QuestionCard
                        key={question._id}
                        question={question}
                        onDelete={() => handleDeleteQuestion(question.id)}
                        onQuestionChange={(field, value) => handleQuestionChange(question.id, field, value)}
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
                  Update Survey
               </button>
            </form>
         )}
      </div>
   );
};

export default EditSurvey;
