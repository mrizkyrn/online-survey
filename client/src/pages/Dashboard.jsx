import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SurveyCard from '../components/SurveyCard';

const Dashboard = () => {
   const [surveys, setSurveys] = useState([]);

   useEffect(() => {
      console.log('useEffect');
      const getSurveys = async () => {
         const res = await fetch('http://localhost:3000/api/surveys');
         const data = await res.json();
         setSurveys(data.data);
      };
      getSurveys();
   }, []);

   const handleDelete = async (surveyId) => {
      console.log(surveyId);
      try {
         const res = await fetch(`http://localhost:3000/api/surveys/${surveyId}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         console.log(data);

         // Update state by removing the deleted survey
         setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey._id !== surveyId));
      } catch (err) {
         console.log(err);
      }
   };

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
               surveys.map((survey) => <SurveyCard key={survey._id} survey={survey} onDelete={() => handleDelete(survey._id)} />)
            ) : (
               <p className="text-xl text-gray-400">No surveys found</p>
            )}
         </div>
      </div>
   );
};

export default Dashboard;
