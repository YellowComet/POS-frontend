import React, {useEffect, useState, useRef} from "react";
import CategoryDetails from './CategoryDetails'
import { motion } from "framer-motion"
 import { getItems, getBgColor } from './logics/GetItems';
import axios from 'axios';
import Constants from '../../../Constants';
import { useTranslation } from 'react-i18next';


const Category = () => {
    const [categoryDetails2, setCategoryDetails2] = useState();
    const [id, setId] = useState();
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [colorList, setColorList] = useState([]);

    const { t } = useTranslation();

    const getCategoriesRef = useRef(() => {
        axios.get(`${Constants.BASE_URL}/get-category-list`).then(res=>{
            setCategoryList(res.data);
            let $catlen = (Object.keys(res.data).length);
            if(colorList.length < $catlen) {
                setColorList(getBgColor($catlen));

            }
        });
    });

    const getSubCategories = (category_id) => {
        axios.get(`${Constants.BASE_URL}/get-subcategory-list/${category_id}`).then(res=>{
            setCategoryDetails2(res.data);
        })
    }

    const getAllSubCategoriesRef = useRef(() => {
        axios.get(`${Constants.BASE_URL}/get-subcategory-list2/`).then(res=>{
            setSubCategoryList(res.data);
        });
    });

    const allEvets = (id) => {
        getSubCategories(id)
        setId(id)
    }

    useEffect(() => {
        getCategoriesRef.current();
        getAllSubCategoriesRef.current();
    }, []);

    return (
        <>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} style={{
                backgroundColor: "#0e1227"
            }} className='p-4 border-b-2 border-black rowCat overflow-y-scroll scrollbar-hide'>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2'>
                    {
                        categoryList.map((curr, i) => {
                            return (
                                <div onClick={() => allEvets(curr.id)} key={i} style={{
                                    backgroundColor: `${colorList[i]}`,
                                    color: "#dfe3f4"
                                }} className='flex items-center justify-between cursor-pointer rounded'>
                                    <div className='flex flex-col items-start justify-between pl-4 py-3 font-bold h-[158px] categoryName'>
                                        <p>{curr.name}</p>
                                         <small className='test-white font-semibold'>{getItems(curr.id, subCategoryList)}  {t("cart-numitems")}</small>
                                    </div>
                                    {
                                        id === curr.id && (<div className='pr-2 bg-black opacity-40 h-full-category'>
                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mt-8 font-bold  ml-1 w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>

                                        </div>)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </motion.div>
            <div className=' p-4 rowCat border-b border-black overflow-y-scroll scrollbar-hide' style={{
                backgroundColor: "#0e1227"
            }}>
                 {categoryDetails2?.length > 0 ? <CategoryDetails categoryDetails={categoryDetails2} /> : (<small className='text-[#818497]'>{t("cart-selectcat")}. </small>)}
            </div>

        </>
    )
}

export default Category