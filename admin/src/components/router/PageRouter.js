import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../modules/Dashboard';
import Master from '../layout/Master';
import Error500 from '../modules/Error500';

const PageRouter = createBrowserRouter([
    {
      path: '/',
      element: <Master />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: '/error-500',
          element: <Error500 />,
        }
      ],
    },
  ]);

export default PageRouter;