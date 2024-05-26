import React from 'react'
import { Link } from "react-router-dom";
import { removeAll } from "../../store/cartSlice";
import { setFalse } from "../../store/returnSlice";
import { useDispatch } from 'react-redux'

const RightDivCart = () => {
    const dispatch = useDispatch();

    const handleRemoveCart = () => {
        dispatch(removeAll());
        dispatch(setFalse());
    }

    return (
        <div>
            <div className='flex justify-between items-center bg-[#060c18] text-white  h-[15vh]'>
                    <div onClick={handleRemoveCart} className='mt-4 sm:mt-0 sm:ml-16 text-center sm:flex-none space-x-4 w-full'>
                        <Link className='inline-flex items-center btn btn-warning justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto text-decoration-none' to="/">Home</Link>
                        <Link className='inline-flex items-center btn btn-danger justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto text-decoration-none' to="/orders">Pedidos</Link>
                    </div>
            </div>
        </div>
    )
}

export default RightDivCart