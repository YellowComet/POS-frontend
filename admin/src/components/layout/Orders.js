import React from 'react';
import OrderDashboard from '../modules/cartmenuItems/OrderDashboard';
import TimeHeader from '../partials/miniComponent/TimeHeader';

const Orders = () => {
    return (
        <>
            <div className='h-[96.8vh]'>
                <TimeHeader />
                <OrderDashboard />
            </div>
        </>
    )
}

export default Orders