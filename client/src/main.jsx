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
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: '/',
            element: <Dashboard />,
         },
         {
            path: '/surveys/:id',
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
            path: '/surveys/:id/edit',
            element: <EditSurvey />,
         },
         {
            path: '/surveys/:id/viewform',
            element: <SurveyForm />,
         },
         {
            path: '*',
            element: <NotFound />,
         }
      ],
   },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
