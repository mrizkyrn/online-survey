import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useEffect, useState } from 'react';

const DetailSurvey = () => {
   const { id } = useParams();
   const [survey, setSurvey] = useState(null);

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

   return (
      <div>
         <div>
            <BackButton />
            <h1 className="inline text-3xl font-semibold text-gray-200 ml-2">{survey.name}</h1>
         </div>

         <p className="text-gray-200 mt-10">{survey.description}</p>

         <div className="mt-10">
            <h1 className="text-2xl font-semibold text-gray-200">Questions</h1>
            {survey.questions.map((question) => (
               <div key={question._id} className="mt-4 p-4 rounded bg-gray-800">
                  <h2 className="text-xl font-semibold text-light">{question.question}</h2>
                  <p className="text-gray-300 mt-2">{question.type}</p>
                  <p className="text-gray-400 mt-2">{question.isRequired ? 'Required' : 'Not Required'}</p>

                  {question.type === "multiple-choice" || question.type === "checkboxes" ? (
                     <div className="mt-4">
                        <h3 className="text-lg font-semibold text-light">Options:</h3>
                        <ul className="list-disc list-inside">
                           {question.options.map((option, index) => (
                              <li key={index} className="text-gray-300 mt-2">
                                 {option}
                              </li>
                           ))}
                        </ul>
                     </div>
                  ) : null}
               </div>
            ))}
         </div>
      </div>
   );
};

export default DetailSurvey;
