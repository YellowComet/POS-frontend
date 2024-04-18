import './assets/css/styles.css'
import './assets/scss/sb-admin-2.scss'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { RouterProvider } from 'react-router-dom'
import PageRouter from './components/router/PageRouter'
import PublicRouter from './components/router/PublicRouter'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [auth, setAuth] = useState(false);

  useEffect( ()=>{
    if (localStorage.token !== undefined){
      setAuth(true)
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
    }
}, [])

  return (
    <>
      {auth ?
            <RouterProvider router={PageRouter} /> :
            <RouterProvider router={PublicRouter} />
      }

    </>
  );
}

export default App;
