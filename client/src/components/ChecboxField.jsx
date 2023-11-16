import { useState } from 'react';
import PropTypes from 'prop-types';

const CheckboxField = ({ question, onAnswerChange }) => {
   const [selectedOptions, setSelectedOptions] = useState([]);

   const handleCheckboxChange = (option) => {
      // Toggle the selected state of the option
      const updatedOptions = selectedOptions.includes(option)
         ? selectedOptions.filter((selected) => selected !== option)
         : [...selectedOptions, option];

      // Update the state and call the onAnswerChange callback
      setSelectedOptions(updatedOptions);
      onAnswerChange(updatedOptions);
   };

   return (
      <div className="flex flex-col gap-2">
         {question.options.map((option, index) => (
            <label key={index}>
               <input
                  type="checkbox"
                  name={`question-${question._id}-${index}`}
                  value={option}
                  className="mr-2"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
               />
               <span className="text-gray-200">{option}</span>
            </label>
         ))}
      </div>
   );
};

CheckboxField.propTypes = {
   question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
   }).isRequired,
   onAnswerChange: PropTypes.func.isRequired,
};

export default CheckboxField;