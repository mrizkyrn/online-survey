import PropTypes from 'prop-types';
import { DeleteIcon } from './Icons';
import Option from './Option';

const QuestionCard = ({ question, onDelete, onQuestionChange }) => {
   const handleAddOption = () => {
      onQuestionChange('options', [...question.options, '']);
   };

   const handleDeleteOption = (index) => {
      onQuestionChange(
         'options',
         question.options.filter((_, i) => i !== index)
      );
   };

   const handleOptionChange = (index, value) => {
      const newOptions = [...question.options];
      newOptions[index] = value;
      onQuestionChange('options', newOptions);
   };

   return (
      <div className="w-full rounded-lg px-8 py-5 bg-[#212e42]">
         <div className="flex justify-between gap-10">
            {/* question */}
            <input
               type="text"
               placeholder="Enter question"
               className="w-full px-3 py-3 border-b text-gray-200 bg-transparent "
               value={question.question}
               onChange={(e) => onQuestionChange('question', e.target.value)}
            />

            {/* type */}
            <select
               name="type"
               id={question._id}
               className="px-5 py-3 rounded-lg text-gray-200 bg-semiDark"
               onChange={(e) => onQuestionChange('type', e.target.value)}
               value={question.type}
            >
               <option value="short-answer">Short Answer</option>
               <option value="long-answer">Long Answer</option>
               <option value="multiple-choice">Multiple Choice</option>
               <option value="checkboxes">Checkboxes</option>
               <option value="rating">Rating</option>
            </select>
         </div>

         {(question.type === 'multiple-choice' || question.type === 'checkboxes') && (
            <div className="flex flex-col gap-2 mt-5">
               <p className="text-gray-200 font-semibold">Options</p>
               {question.options.map((option, index) => (
                  <Option
                     key={question._id + index}
                     option={{ value: option }}
                     onDelete={() => handleDeleteOption(index)}
                     onOptionChange={(value) => handleOptionChange(index, value)}
                  />
               ))}
               <button
                  type="button"
                  className="px-5 py-3 rounded-lg text-gray-200 bg-semiDark mt-5"
                  onClick={handleAddOption}
               >
                  Add Option
               </button>
            </div>
         )}

         <div className="flex mt-5">
            <div className="flex items-center gap-3">
               <input
                  type="checkbox"
                  name="isRequired"
                  checked={question.isRequired}
                  id={`req${question._id}`}
                  onChange={(e) => onQuestionChange('isRequired', e.target.checked)}
               />
               <label className="text-gray-200" htmlFor={`req${question._id}`}>
                  Required
               </label>
            </div>
            <button className="px-5 py-3 rounded-lg text-gray-200 ml-auto" onClick={onDelete}>
               <DeleteIcon className="w-5 h-5" />
            </button>
         </div>
      </div>
   );
};

QuestionCard.propTypes = {
   question: PropTypes.object.isRequired,
   onDelete: PropTypes.func.isRequired,
   onQuestionChange: PropTypes.func.isRequired,
};

export default QuestionCard;
