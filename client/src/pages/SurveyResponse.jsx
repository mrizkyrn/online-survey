import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const SurveyResponse = () => {
   const { survey } = useOutletContext();
   const [responses, setResponses] = useState([]);


   useEffect(() => {
      const getResponses = async () => {
         const res = await fetch(`http://localhost:3000/api/responses/${survey._id}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         console.log(data);
         setResponses(data.data);
      };

      getResponses();
   }, []);

   if (!responses) return <p>Loading...</p>;

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
               {responses.map((response) => (
                  <div key={response._id} className="p-4 rounded bg-gray-800">
                     <h3 className="text-lg font-semibold text-light">{response.question}</h3>
                     <p className="text-gray-300 mt-2">{response.response}</p>
                  </div>
               ))}

               {responses.length === 0 ? <p className="text-gray-300 mt-5">No responses yet.</p> : null}
            </div>
         </div>
      </div>
   );
};

export default SurveyResponse;
