import React from 'react'
import TimeHeader from './../partials/miniComponent/TimeHeader';
import HomeDashboard from './cartmenuItems/HomeDashboard';

const CartMenu = () => {

  return (
      <div className='h-screen'>
        <TimeHeader />
        <HomeDashboard />
      </div>
  )
}

export default CartMenu;