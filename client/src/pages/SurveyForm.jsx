/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShortField from '../components/ShortField';
import LongField from '../components/LongField';
import MultipleField from '../components/MultipleField';
import CheckboxField from '../components/ChecboxField';


const QuestionField = ({ question, onAnswerChange }) => {
   switch (question.type) {
      case 'short-answer':
         return <ShortField question={question} onAnswerChange={onAnswerChange} />;
      case 'long-answer':
         return <LongField question={question} onAnswerChange={onAnswerChange} />;
      case 'multiple-choice':
         return <MultipleField question={question} onAnswerChange={onAnswerChange} />;
      case 'checkboxes':
         return <CheckboxField question={question} onAnswerChange={onAnswerChange} />;
      default:
         return null;
   }
};

const SurveyForm = () => {
   const { id } = useParams();
   const [survey, setSurvey] = useState({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      questions: [],
   });
   const [responses, setResponses] = useState({});

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

   if (!survey) return <p>Loading...</p>;

   const handleAnswerChange = (questionId, answer) => {
      setResponses({
         ...responses,
         [questionId]: answer,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await fetch(`http://localhost:3000/api/${id}/questions`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               responses,
            }),
         });
         const data = await res.json();
         console.log(data);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div>
         <h1 className="text-3xl font-semibold text-light">{survey.name}</h1>
         <p className="text-gray-200 mt-5">{survey.description}</p>
         <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmit}>
            {survey.questions.map((question) => (
               <div key={question._id}>
                  <h2 className="text-base font-semibold text-gray-200 mb-3">
                     {question.question} <span className="text-red-500">{question.isRequired ? '*' : null}</span>
                  </h2>
                  <QuestionField
                     question={question}
                     onAnswerChange={(answer) => handleAnswerChange(question._id, answer)}
                  />
               </div>
            ))}

            <button type="submit" className="w-full bg-primary px-5 py-3 rounded-md font-semibold text-light mt-12">
               Submit
            </button>
         </form>
      </div>
   );
};

export default SurveyForm;
