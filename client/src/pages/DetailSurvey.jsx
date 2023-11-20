import { NavLink, Outlet, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const DetailSurvey = () => {
   const { id } = useParams();
   const [survey, setSurvey] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const getSurvey = async () => {
         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/surveys/${id}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();

         if (!data.success) {
            return;
         }

         setSurvey(data.data);
      };

      setLoading(true);
      getSurvey();
      setLoading(false);
   }, [id]);

   return (
      <div>
         {loading || !survey ? (
            <Loading />
         ) : (
            <div>
               <div>
                  <BackButton relative="route" />
                  <h1 className="inline text-3xl font-semibold text-gray-200 ml-2">{survey.name}</h1>
               </div>

               <p className="text-gray-200 mt-10">{survey.description}</p>

               <div className="mt-10 flex gap-7 text-gray-200 mb-7">
                  <NavLink
                     to={``}
                     end
                     className={({ isActive }) =>
                        isActive ? 'text-blue-500' : 'text-gray-200 cursor-pointer hover:text-blue-500'
                     }
                  >
                     Questions
                  </NavLink>
                  <NavLink
                     to={`responses`}
                     className={({ isActive }) =>
                        isActive ? 'text-blue-500' : 'text-gray-200 cursor-pointer hover:text-blue-500'
                     }
                  >
                     Responses
                  </NavLink>
               </div>

               <Outlet context={{ survey }} />
            </div>
         )}
      </div>
   );
};

export default DetailSurvey;
