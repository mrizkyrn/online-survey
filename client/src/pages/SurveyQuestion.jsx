import { useOutletContext } from 'react-router-dom';

const SurveyQuestion = () => {
   const { survey } = useOutletContext();

   return (
      <>
         {survey.questions.map((question) => (
            <div key={question._id} className="mt-4 p-4 rounded bg-gray-800">
               <h2 className="text-xl font-semibold text-light">{question.question}</h2>
               <p className="text-gray-300 mt-2">{question.type}</p>
               <p className="text-gray-400 mt-2">{question.isRequired ? 'Required' : 'Not Required'}</p>

               {question.type === 'multiple-choice' || question.type === 'checkboxes' ? (
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
      </>
   );
};

export default SurveyQuestion;
