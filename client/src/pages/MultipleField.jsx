import PropTypes from 'prop-types';

const MultipleField = ({ question, onAnswerChange }) => {
   return (
      <div className="flex flex-col gap-2">
         {question.options.map((option, index) => (
            <label key={index}>
               <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option}
                  required={question.isRequired}
                  className="mr-2"
                  onChange={() => onAnswerChange(option)}
               />
               <span className="text-gray-200">{option}</span>
            </label>
         ))}
      </div>
   );
};

MultipleField.propTypes = {
   question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isRequired: PropTypes.bool.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
   }).isRequired,
   onAnswerChange: PropTypes.func.isRequired,
};

export default MultipleField;
