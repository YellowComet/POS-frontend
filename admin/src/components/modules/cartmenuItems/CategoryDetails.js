import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from "react-redux"
import { add } from "../../store/cartSlice"

const CategoryDetails = ({ categoryDetails }) => {
    const [quantity, setQuantity] = useState(0);
    const [id, setId] = useState(null);
    const dispatch = useDispatch();
    const inCreament = (id) => {
        setId(id);
        setQuantity(quantity + 1);
    }
    const deCrement = (id) => {
        setId(id);
        if (quantity === 0) return;
        setQuantity(quantity - 1);
    }

    const addItems = (data) => {
        const { id, name, serial} = data;
        const newData = { id, name, serial : serial*quantity, quantity: quantity };

        if (quantity > 0) {
            dispatch(add(newData))
            setQuantity(0);
        }
    }

    return (
        <div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-1'>

                {categoryDetails?.map((curr, i) => (
                    <>
                        {curr.status ? 
                        (<>
                            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ease: "easeOut", duration: 0.5 }} whileHover={{
                                backgroundColor: "#1f2544",
                            }} style={{
                                backgroundColor: "#151a34",
                                color: "#dfe3f4"
                            }} className='flex justify-between p-3 h-[150px] cursor-pointer  subCategoryName'>
                                <div onClick={() => addItems(curr)} className='flex flex-col items-start justify-between pl-4 font-bold h-[95px] space-y-5'>
                                    <div>
                                        <p>{curr.name}</p>
                                        <p className='text-sm text-[#818497]'> {curr.serial} €
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-between'>
                                    <svg onClick={() => inCreament(curr.id)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6 bg-[#0e1227] rounded-sm p-1 ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <p className='font-semibold text-2xl'>{id === curr.id ? quantity : "0"}</p>
                                    <svg onClick={() => deCrement(curr.id)} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6 bg-[#0e1227] rounded-sm p-1 ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </div>
                            </motion.div>
                        </>) : 
                        (<>
                            <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ease: "easeOut", duration: 0.5 }} whileHover={{
                                backgroundColor: "#AAAAAA",
                            }} style={{
                                backgroundColor: "#AAAAAA",
                                color: "#FFFFFF"
                            }} className='flex justify-between p-3 h-[150px] cursor-pointer  subCategoryName cursor-not-allowed'>
                                <div className='flex flex-col items-start justify-between pl-4 font-bold h-[95px] space-y-5 cursor-not-allowed'>
                                    <div>
                                        <p>{curr.name}</p>
                                        <p className='text-sm text-[#818497]'> {curr.serial} €
                                        </p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-between'>
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-not-allowed w-6 h-6 bg-[#0e1227] rounded-sm p-1 ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <p className='font-semibold text-2xl'>{id === curr.id ? quantity : "0"}</p>
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-not-allowed w-6 h-6 bg-[#0e1227] rounded-sm p-1 ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </div>
                            </motion.div>
                        
                        
                        </>)
                        }
                    </>     
                ))}
            </div>
        </div>
    )
}

export default CategoryDetails;