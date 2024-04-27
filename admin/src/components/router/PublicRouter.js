import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../modules/auth/Login';
import AuthLayout from '../layout/AuthLayout';
import Error500 from '../modules/Error500';
import AddCategory from '../modules/category/AddCategory';

const PublicRouter = createBrowserRouter([
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