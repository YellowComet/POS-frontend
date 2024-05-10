import React from 'react'
import CartItems from './CartItems'
import DivRightCart from './DivRightCart'
// import { useSelector, useDispatch } from "react-redux"

const Cart = () => {
    // const customer = useSelector(state => state.customer);
    // const dispatch = useDispatch();
    return (
        <div>
            <DivRightCart />
            <CartItems /> 
        </div>
    )
}

export default Cart