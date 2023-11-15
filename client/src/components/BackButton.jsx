import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BackIcon } from './Icons';

const BackButton = ({relative = 'path'}) => {
   return (
      <div className="inline-block">
         <Link to={'..'} relative={relative} className="flex justify-start items-center text-white px-4 py-2 rounded-md" aria-label='Back' >
            <BackIcon className="w-6 h-6" />
         </Link>
      </div>
   );
};

BackButton.propTypes = {
   relative: PropTypes.string,
};

export default BackButton;
