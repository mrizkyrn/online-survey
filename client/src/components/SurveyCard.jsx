import PropTypes from 'prop-types';
import { DeleteIcon, EditIcon } from './Icons';
import { Link } from 'react-router-dom';

const SurveyCard = ({ survey, onDelete }) => {
   const createdAt = new Date(survey.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });

   return (
      <div className="w-full h-32 flex flex-col justify-between bg-[#212e42] rounded-md px-5 py-4 hover:bg-[#2d3a4e] transition duration-200">
         <div>
            <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold text-gray-200">{survey.name}</h1>
               <div className="flex gap-5">
                  <Link
                     to={`/${survey._id}/edit`}
                     className="text-gray-200 font-semibold hover:text-primary transition duration-200"
                  >
                     <EditIcon className="w-5 h-5 " />
                  </Link>

                  <button
                     onClick={onDelete}
                     className="text-gray-200 cursor-pointer hover:text-primary transition duration-200"
                  >
                     <DeleteIcon className="w-5 h-5" />
                  </button>
               </div>
            </div>
            <p className="leading-6 mt-1 line-clamp-1 text-gray-300">{survey.description}</p>
         </div>
         <div className="flex justify-between items-center">
            <Link
               to={`/${survey._id}`}
               className="text-gray-500 font-semibold hover:text-primary transition duration-200"
            >
               View Detail
            </Link>
            <p className="text-sm text-gray-400">{createdAt}</p>
         </div>
      </div>
   );
};

SurveyCard.propTypes = {
   survey: PropTypes.object.isRequired,
   onDelete: PropTypes.func.isRequired,
};

export default SurveyCard;
