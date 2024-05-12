import React from 'react'
import { useNavigate } from 'react-router-dom'
const RightDivCart = () => {
    // const user = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();
    // const logout = () => {
    //     localStorage.removeItem("userInfo");
    //     localStorage.removeItem("jwt");
    //     navigate("/")
    // }
    return (
        <div>
            <div className='flex justify-between items-center bg-[#060c18] text-white px-4 h-[15vh]'>
                <svg  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <div className='flex items-center'>
                    <div>
                        <p className='text-right font-semibold'>Diego Miret</p>
                        {/* <p style={{
                            fontSize : "10px"
                        }} className='text-[#5b5f67]'>Clocked in 12:23 PM</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightDivCart