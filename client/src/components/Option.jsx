import PropTypes from 'prop-types';
import { XmarkIcon } from './Icons';

const Option = ({ option, onDelete, onOptionChange }) => {
   return (
      <div className="flex items-center gap-3 w-64">
         <input
            type="text"
            placeholder="Enter option"
            className="w-full px-3 py-3 border-b text-gray-200 bg-transparent "
            value={option.value}
            onChange={(e) => onOptionChange(e.target.value)}
         />
         <button
            type="button"
            className="px-5 py-3 rounded-lg text-gray-200"
            onClick={onDelete}
            aria-label="Delete option"
         >
            <XmarkIcon className="w-7 h-7" />
         </button>
      </div>
   );
};

Option.propTypes = {
   option: PropTypes.object.isRequired,
   onDelete: PropTypes.func.isRequired,
   onOptionChange: PropTypes.func.isRequired,
};

export default Option;
