import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SurveyCard from '../components/SurveyCard';

const Dashboard = () => {
   const [surveys, setSurveys] = useState([]);

   useEffect(() => {
      const getSurveys = async () => {
         const res = await fetch('http://localhost:3000/api/surveys');
         const data = await res.json();
         setSurveys(data.data);
      };
      getSurveys();
   }, []);

   return (
      <div>
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-light">Dashboard</h1>
            <Link to="create" className="bg-primary px-5 py-3 rounded-md font-semibold text-light">
               Create Survey
            </Link>
         </div>
         <div className="flex flex-col gap-5 mt-10">
            {surveys ? (
               surveys.map((survey) => <SurveyCard key={survey._id} survey={survey} />)
            ) : (
               <p className="text-xl text-gray-400">No surveys found</p>
            )}
         </div>
      </div>
   );
};

export default Dashboard;