import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const SurveyResponse = () => {
   const { survey } = useOutletContext();
   const [questions, setQuestions] = useState([]);
   const [filter, setFilter] = useState({
      type: [],
      isRequired: [],
      sortBy: [],
   });

   useEffect(() => {
      console.log({ 
         type: filter.type.join(','),
         isRequired: filter.isRequired.join(','),
         sortBy: filter.sortBy.join(','),
       });

      const getQuestions = async () => {
         const res = await fetch(`http://localhost:3000/api/${survey._id}/questions?${new URLSearchParams({
            type: filter.type.join(','),
            isRequired: filter.isRequired.join(','),
            sortBy: filter.sortBy.join(','),
          })}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         setQuestions(data.data);
      }

      getQuestions();
   }, [filter, survey._id]);

   const handleFilterChange = (key, value) => {
      if (filter[key].includes(value)) {
         setFilter((prev) => ({
            ...prev,
            [key]: prev[key].filter((v) => v !== value),
         }));
      } else {
         setFilter((prev) => ({
            ...prev,
            [key]: [...prev[key], value],
         }));
      }
   };

   if (!questions) return <p>Loading...</p>;

   return (
      <div>
         {/* filter */}
         <div className="mt-10">
            <div className="mt-4">
               <div className="flex flex-col sm:flex-row justify-between gap-10">
                  <div className="flex flex-col">
                     <h2 className="text-lg font-semibold text-gray-200 mb-2">Filter</h2>
                     <div className="flex justify-between gap-10">
                        <div>
                           <h3 className="text-base font-semibold text-gray-200">Question type</h3>
                           <div>
                              <div className="flex items-center gap-3 mt-2">
                                 <input
                                    type="checkbox"
                                    id="short-answer"
                                    name="short-answer"
                                    checked={filter.type.includes('short-answer')}
                                    onChange={() => handleFilterChange('type', 'short-answer')}
                                 />
                                 <label htmlFor="short-answer" className="text-gray-300">
                                    Short Answer
                                 </label>
                              </div>

                              <div className="flex items-center gap-3 mt-2">
                                 <input
                                    type="checkbox"
                                    id="long-answer"
                                    name="long-answer"
                                    checked={filter.type.includes('long-answer')}
                                    onChange={() => handleFilterChange('type', 'long-answer')}
                                 />
                                 <label htmlFor="long-answer" className="text-gray-300">
                                    Long Answer
                                 </label>
                              </div>

                              <div className="flex items-center gap-3 mt-2">
                                 <input
                                    type="checkbox"
                                    id="multiple-choice"
                                    name="multiple-choice"
                                    checked={filter.type.includes('multiple-choice')}
                                    onChange={() => handleFilterChange('type', 'multiple-choice')}
                                 />
                                 <label htmlFor="multiple-choice" className="text-gray-300">
                                    Multiple Choice
                                 </label>
                              </div>

                              <div className="flex items-center gap-3 mt-2">
                                 <input
                                    type="checkbox"
                                    id="checkboxes"
                                    name="checkboxes"
                                    checked={filter.type.includes('checkboxes')}
                                    onChange={() => handleFilterChange('type', 'checkboxes')}
                                 />
                                 <label htmlFor="checkboxes" className="text-gray-300">
                                    Checkboxes
                                 </label>
                              </div>
                           </div>
                        </div>

                        <div>
                           <h3 className="text-base font-semibold text-gray-200">Question status</h3>
                           <div>
                              <div className="flex items-center gap-3 mt-2">
                                 <input
                                    type="checkbox"
                                    id="required"
                                    name="required"
                                    checked={filter.isRequired.includes(true)}
                                    onChange={() => handleFilterChange('isRequired', true)}
                                 />
                                 <label htmlFor="required" className="text-gray-300">
                                    Required
                                 </label>
                              </div>

                              <div className="flex items-center gap-3 mt-2">
                                 <input
                                    type="checkbox"
                                    id="not-required"
                                    name="not-required"
                                    checked={filter.isRequired.includes(false)}
                                    onChange={() => handleFilterChange('isRequired', false)}
                                 />
                                 <label htmlFor="not-required" className="text-gray-300">
                                    Not Required
                                 </label>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  {/* sort */}
                  <div className="">
                     <h2 className="text-lg font-semibold text-gray-200 mb-2">Sort by</h2>
                     <div>
                        <div className="flex items-center gap-3 mt-2">
                           <input
                              type="checkbox"
                              id="required-status"
                              name="required-status"
                              checked={filter.sortBy.includes('isRequired')}
                              onChange={() => handleFilterChange('sortBy', 'isRequired')}
                           />
                           <label htmlFor="required-status" className="text-gray-300">
                              Required Status
                           </label>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                           <input
                              type='checkbox'
                              id="question-type"
                              name="question-type"
                              checked={filter.sortBy.includes('type')}
                              onChange={() => handleFilterChange('sortBy', 'type')}
                           />
                           <label htmlFor="question-type" className="text-gray-300">
                              Question Type
                           </label>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-3 mt-10">
               {questions.map((question) => (
                  <div key={question._id} className="p-4 rounded bg-gray-800">
                     <h3 className="text-lg font-semibold text-light">{question.question}</h3>
                     <p className='text-gray-400 text-sm'>{question.type} - {question.isRequired ? 'Required' : 'Not Required'}</p>
                     <p className="text-gray-300 mt-4 mb-2">Total Responses: {question.totalResponses}</p>
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
                  </div>
               ))}

               {questions.length === 0 ? <p className="text-gray-300 mt-5">No questions yet.</p> : null}
            </div>
         </div>
      </div>
   );
};

export default SurveyResponse;
