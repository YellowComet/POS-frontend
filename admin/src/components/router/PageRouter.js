import React from 'react';
import { createHashRouter } from 'react-router-dom';
import Dashboard from '../modules/Dashboard';
import Master from '../layout/Master';
import Error500 from '../modules/Error500';
import AddCategory from '../modules/category/AddCategory';
import CategoryList from '../modules/category/CategoryList';
import CategoryEdit from '../modules/category/CategoryEdit';
import SubCategoryAdd from '../modules/subCategory/SubCategoryAdd';
import SubCategoryList from '../modules/subCategory/SubCategoryList';
import SubCategoryEdit from '../modules/subCategory/SubCategoryEdit';
import SupplierAdd from '../modules/suppliers/SupplierAdd';
import SupplierList from '../modules/suppliers/SupplierList';
import CartMenu from '../modules/CartMenu';
import Orders from '../layout/Orders';
import BarCode from '../bar_code/BarCode';
import Dashboard2 from '../modules/Dashboard2';

const PageRouter = createHashRouter([
    {
      path: '/',
      element: <Master />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
        {
          path: '/category',
          element: <CategoryList />,
        },
        {
          path: '/category/create',
          element: <AddCategory />,
        },
        {
          path: '/category/edit/:id',
          element: <CategoryEdit />,
        },
        {
          path: '/sub-category',
          element: <SubCategoryList />,
        },
        {
          path: '/sub-category/create',
          element: <SubCategoryAdd />,
        },
        {
          path: '/sub-category/edit/:id',
          element: <SubCategoryEdit />,
        },
        {
          path: '/supplier',
          element: <SupplierList />,
        },
        {
          path: '/supplier/create',
          element: <SupplierAdd />,
        },
        {
          path: '/error-500',
          element: <Error500 />,
        },
        {
          path: '/barcode',
          element: <BarCode />,
        },
      ],
    },
    {
      path: '/cartmenu',
      element: <CartMenu />,
    },
    {
      path: '/orders',
      element: <Orders />,
    },
  ]);

export default PageRouter;