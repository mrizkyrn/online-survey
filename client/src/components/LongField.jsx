import PropTypes from 'prop-types';

const LongField = ({ question, onAnswerChange }) => {
   return (
      <textarea
         placeholder="Long Answer"
         rows="3"
         name={`question-${question._id}`}
         required={question.isRequired}
         className="w-full bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
         onChange={(e) => onAnswerChange(e.target.value)}
      />
   );
};

LongField.propTypes = {
   question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isRequired: PropTypes.bool.isRequired,
   }).isRequired,
   onAnswerChange: PropTypes.func.isRequired,
};

export default LongField;
