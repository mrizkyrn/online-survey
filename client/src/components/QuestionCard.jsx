import { useState } from 'react';
import PropTypes from 'prop-types';

const QuestionCard = ({ question, type, isRequired, options, onQuestionChange }) => {
   const [localOptions, setLocalOptions] = useState(options);

   const handleAddOption = () => {
      setLocalOptions([...localOptions, '']);
   };

   const handleDeleteOption = (index) => {
      const newOptions = [...localOptions];
      newOptions.splice(index, 1);
      setLocalOptions(newOptions);
      onQuestionChange('options', newOptions);
   };

   const handleOptionChange = (index, value) => {
      const newOptions = [...localOptions];
      newOptions[index] = value;
      setLocalOptions(newOptions);
      onQuestionChange('options', newOptions);
   };

   return (
      <div className="w-full rounded-lg px-8 py-5 bg-[#212e42]">
         <div className="flex justify-between gap-10">
            <input
               type="text"
               placeholder="Enter question"
               className="w-full px-3 py-3 border-b text-gray-200 bg-transparent "
               value={question}
               onChange={(e) => onQuestionChange('question', e.target.value)}
            />
            <select
               name="type"
               id="type"
               className="px-5 py-3 rounded-lg text-gray-200 bg-semiDark"
               onChange={(e) => onQuestionChange('type', e.target.value)}
               value={type}
            >
               <option value="short-answer">Short Answer</option>
               <option value="long-answer">Long Answer</option>
               <option value="multiple-choice">Multiple Choice</option>
               <option value="checkboxes">Checkboxes</option>
               <option value="rating">Rating</option>
            </select>
         </div>

         {(type === 'multiple-choice' || type === 'checkboxes') && (
            <div className="flex flex-col gap-2 mt-5">
               <p className="text-gray-200 font-semibold">Options</p>
               {localOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                     <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        className="px-3 py-2 border-b text-gray-200 bg-transparent"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                     />
                     <button
                        className="px-3 py-2 rounded-lg text-gray-200 bg-semiDark"
                        onClick={() => handleDeleteOption(index)}
                     >
                        Delete
                     </button>
                  </div>
               ))}
               <button className="px-5 py-3 rounded-lg text-gray-200 bg-semiDark mt-5" onClick={handleAddOption}>
                  Add Option
               </button>
            </div>
         )}

         <div className="flex mt-5">
            <div className="flex items-center gap-3">
               <input
                  type="checkbox"
                  name="isRequired"
                  id="isRequired"
                  checked={isRequired}
                  onChange={(e) => onQuestionChange('isRequired', e.target.checked)}
               />
               <label htmlFor="isRequired" className="text-gray-200">
                  Required
               </label>
            </div>
         </div>
      </div>
   );
};

QuestionCard.propTypes = {
   question: PropTypes.string.isRequired,
   type: PropTypes.string.isRequired,
   isRequired: PropTypes.bool.isRequired,
   options: PropTypes.arrayOf(PropTypes.string),
   onQuestionChange: PropTypes.func.isRequired,
};

export default QuestionCard;