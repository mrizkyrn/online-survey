import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EditSurvey from './pages/EditSurvey';
import DetailSurvey from './pages/DetailSurvey';
import SurveyForm from './pages/SurveyForm';
import SurveyQuestion from './pages/SurveyQuestion';
import SurveyResponse from './pages/SurveyResponse';

const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: '/',
            element: <Dashboard />,
         },
         {
            path: '/:id',
            element: <DetailSurvey />,
            children: [
               {
                  index: true,
                  element: <SurveyQuestion />,
               },
               {
                  path: 'responses',
                  element: <SurveyResponse />,
               }
            ],
         },
         {
            path: '/:id/edit',
            element: <EditSurvey />,
         },
         {
            path: '/:id/viewform',
            element: <SurveyForm />,
         }
      ],
   },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
