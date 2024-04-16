import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../modules/Dashboard';
import Master from '../layout/Master';
import AuthLayout from '../layout/AuthLayout';

const PageRouter = createBrowserRouter([
    {
      path: '/',
      element: <Master />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        }
      ],
    },
  ]);

export default PageRouter;