import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SurveyCard from '../components/SurveyCard';

const Dashboard = () => {
   const [surveys, setSurveys] = useState([]);
   const navigate = useNavigate();
   const [error, setError] = useState(null);

   // Fetch all surveys
   useEffect(() => {
      const getSurveys = async () => {
         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/surveys`);
         const data = await res.json();

         if (!data.success) {
            setError(data.message);
            return;
         }

         setSurveys(data.data);
      };
      getSurveys();
   }, []);

   // Delete survey
   const handleDelete = async (surveyId) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/surveys/${surveyId}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      const data = await res.json();

      if (!data.success) {
         setError(data.message);
         return;
      }

      setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey._id !== surveyId));
   };

   // Create survey
   const handleCreateSurvey = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/surveys/empty`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            name: 'Untitled Survey',
            description: '',
            startDate: Date.now(),
            endDate: Date.now(),
         }),
      });
      const data = await res.json();
      
      if (!data.success) {
         setError(data.message);
         return;
      }

      navigate(`/surveys/${data.data._id}/edit`);
   };

   return (
      <div>
         <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-light">Dashboard</h1>
            <button onClick={handleCreateSurvey} className="bg-primary hover:bg-primaryLight px-5 py-3 rounded-md font-semibold text-light">
               Create Survey
            </button>
         </div>
         <div className="flex flex-col gap-5 mt-10">
            {surveys ? (
               surveys.map((survey) => (
                  <SurveyCard key={survey._id} survey={survey} onDelete={() => handleDelete(survey._id)} />
               ))
            ) : (
               <p className="text-xl text-gray-400">No surveys found</p>
            )}

            {error && <p className="text-red-500">{error}</p>}
         </div>
      </div>
   );
};

export default Dashboard;
