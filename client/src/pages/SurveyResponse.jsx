import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const SurveyResponse = () => {
   const { survey } = useOutletContext();
   const [questions, setQuestions] = useState([]);

   useEffect(() => {
      const getQuestions = async () => {
         const res = await fetch(`http://localhost:3000/api/${survey._id}/questions`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         setQuestions(data.data);
      };

      getQuestions();
   }, []);

   if (!questions) return <p>Loading...</p>;

   console.log(questions);

   return (
      <div>
         {/* filter */}
         <div className="mt-10">
            <div className="mt-4">
               <div className="flex justify-between">
                  <div className="">
                     <h3 className="text-base font-semibold text-gray-200">Question type</h3>
                     <div>
                        <div className="flex items-center gap-3 mt-2">
                           <input type="checkbox" />
                           <p className="text-gray-300">multiple choice</p>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                           <input type="checkbox" />
                           <p className="text-gray-300">checkboxes</p>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                           <input type="checkbox" />
                           <p className="text-gray-300">short answer</p>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                           <input type="checkbox" />
                           <p className="text-gray-300">long answer</p>
                        </div>
                     </div>
                  </div>
                  <div className="">
                     <h3 className="text-base font-semibold text-gray-200">Question</h3>
                     {
                        <select className="mt-2">
                           {survey.questions.map((question) => (
                              <option key={question._id} value={question._id}>
                                 {question.question}
                              </option>
                           ))}
                        </select>
                     }
                  </div>
                  {/* sort */}
                  <div className="">
                     <h3 className="text-base font-semibold text-gray-200">Sort by</h3>
                     <div>
                        <div className="flex items-center gap-3 mt-2">
                           <input type="checkbox" />
                           <p className="text-gray-300">question type</p>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                           <input type="checkbox" />
                           <p className="text-gray-300">question status</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-3 mt-10">
               {questions.map((question) => (
                  <div key={question._id} className="p-4 rounded bg-gray-800">
                     <h3 className="text-lg font-semibold text-light">{question.question}</h3>
                     <p className="text-gray-300 mt-4 mb-2">Total Responses: {question.responses.length}</p>
                     {question.type === 'short-answer' && (
                        <div>
                           {question.responses.map((response) => (
                              <li key={response._id} className="text-gray-200">
                                 {response.response}
                              </li>
                           ))}
                        </div>
                     )}
                     {question.type === 'long-answer' && (
                        <div>
                           {question.responses.map((response) => (
                              <li key={response._id} className="text-gray-200">
                                 {response.response}
                              </li>
                           ))}
                        </div>
                     )}
                     {question.type === 'multiple-choice' && (
                        <div>
                           {question.options.map((option) => (
                              <div key={option} className="flex items-center pb-2">
                                 <p className="text-gray-200">{option}</p>
                                 <p className="text-gray-500 ml-4">
                                    Responses: {question.responses.filter((r) => r.response === option).length}
                                 </p>
                              </div>
                           ))}
                        </div>
                     )}
                     {question.type === 'checkboxes' && (
                        <div>
                           {question.options.map((option) => (
                              <div key={option} className="flex items-center mb-2">
                                 <p className="text-gray-200">{option}</p>
                                 <p className="text-gray-500 ml-4">
                                    Responses: {question.responses.filter((r) => r.response.includes(option)).length}
                                 </p>
                              </div>
                           ))}
                        </div>
                     )}
                     {question.type === 'rating' && (
                        <div>
                           {question.responses.map((response) => (
                              <p key={response._id} className="text-gray-200">
                                 {response.response}
                              </p>
                           ))}
                        </div>
                     )}
                  </div>
               ))}

               {questions.length === 0 ? <p className="text-gray-300 mt-5">No questions yet.</p> : null}
            </div>
         </div>
      </div>
   );
};

export default SurveyResponse;
