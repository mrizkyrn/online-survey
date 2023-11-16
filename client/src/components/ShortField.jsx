import PropTypes from "prop-types";

const ShortField = ({ question, onResponseChange }) => {
   return (
      <input
         type="text"
         placeholder="Short Answer"
         name={`question-${question._id}`}
         required={question.isRequired}
         className="w-full bg-[#212e42] px-5 py-3 rounded-md text-gray-200"
         onChange={(e) => onResponseChange(e.target.value)}
      />
   );
};

ShortField.propTypes = {
   question: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isRequired: PropTypes.bool.isRequired,
   }).isRequired,
   onResponseChange: PropTypes.func.isRequired,
};

export default ShortField;
