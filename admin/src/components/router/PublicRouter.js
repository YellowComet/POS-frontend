import React from 'react';
import { createHashRouter } from 'react-router-dom';
import Login from '../modules/auth/Login';
import AuthLayout from '../layout/AuthLayout';
import Error500 from '../modules/Error500';

const PublicRouter = createHashRouter([
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: '/',
          element: <Login />,
        },
        {
          path: '/error-500',
          element: <Error500 />,
        }
      ],
    },
  ]);

export default PublicRouter;