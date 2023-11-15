import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import CreateSurvey from './pages/CreateSurvey';
import Layout from './components/Layout';

const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [{ path: '/create', element: <CreateSurvey /> }],
   },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
