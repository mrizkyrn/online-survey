import { NavLink, Outlet, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useEffect, useState } from 'react';

const DetailSurvey = () => {
   const { id } = useParams();
   const [survey, setSurvey] = useState(null);

   useEffect(() => {
      const getSurvey = async () => {
         const res = await fetch(`http://localhost:3000/api/surveys/${id}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         setSurvey(data.data);
      };
      getSurvey();
   }, [id]);

   if (!survey) return <p>Loading...</p>;

   return (
      <div>
         <div>
            <BackButton />
            <h1 className="inline text-3xl font-semibold text-gray-200 ml-2">{survey.name}</h1>
         </div>

         <p className="text-gray-200 mt-10">{survey.description}</p>

         <div className='mt-10 flex gap-7 text-gray-200 mb-7'>
            <NavLink
               to={``}
               end
               className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-gray-200 cursor-pointer hover:text-blue-500')}
            >
               Questions
            </NavLink>
            <NavLink
               to={`responses`}
               className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-gray-200 cursor-pointer hover:text-blue-500')}
            >
               Responses
            </NavLink>
         </div>

         <Outlet context={{ survey }} />
      </div>
   );
};

export default DetailSurvey;
