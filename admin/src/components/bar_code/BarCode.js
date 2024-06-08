import { useRef, useState, useEffect } from 'react'
import PageHead from '../partials/PageHead';
import { useTranslation } from 'react-i18next';
import CardHeader from "../partials/miniComponent/CardHeader";
import axios from 'axios';
import Constants from '../../Constants';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import { Dialog } from '@headlessui/react'

const BarCode = () => {
    const { t } = useTranslation();
    const componentRef = useRef();

    const [input, setInput] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [subcategoryList, setSubategoryList] = useState([]);
    const [paperSize, setPaperSize] = useState({
        a4:{
            width: 595,
            height: 842
        }
    })

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleInput = (e) => {
        if(e.target.name === 'category_id'){
            let category_id = parseInt(e.target.value);
            if(!Number.isNaN(category_id)){
                getSubCategories(e.target.value);
            }
        }
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const getCategoriesRef = useRef(() => {
        axios.get(`${Constants.BASE_URL}/get-category-list`).then(res=>{
            setCategoryList(res.data);
        });
    });

    const getSubCategories = (category_id) => {
        axios.get(`${Constants.BASE_URL}/get-subcategory-list/${category_id}`).then(res=>{
            setSubategoryList(res.data);
        })
    }

    const handleProductSearch = () => {


    }

    useEffect(() => {
        getCategoriesRef.current();
    }, []);

    return (
        <>
        <PageHead title={t("barcode-tittle")} title2={t("barcode-tittle2")} pageTitle={t("barcode-head")}/>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                        <CardHeader 
                            title={t("barcode-tittle2")}
                            link={'/'}
                            icon={''}
                            button_text={''}
                        />
                    </div>
                    <div className='card-body'>
                        <div className='row align-items-baseline'>
                            <div className='col-md-6 text-center'>
                                    <label className="w-100 mt-4 mt-md-0">
                                        <p>{t("barcode-selectCategory")}</p>
                                        <select
                                            className={'form-control mt-2 text-center'}
                                            name={'category_id'}
                                            value={input.category_id}
                                            onChange={handleInput}
                                            placeholder={t("barcode-selectCategory")}
                                        >
                                            {categoryList.map((category, index)=>(
                                               <option key={index} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </label>
                            </div>
                            <div className='col-md-6 text-center'>
                                    <label className="w-100 mt-4 mt-md-0">
                                        <p>{t("barcode-selectProduct")}</p>
                                        <select
                                            className={'form-control mt-2 text-center'}
                                            name={'subcategory_id'}
                                            value={input.subcategory_id}
                                            onChange={handleInput}
                                            placeholder={t("barcode-selectProduct")}
                                            disabled={input.category_id === undefined}
                                        >
                                            {subcategoryList.map((category, index)=>(
                                               <option key={index} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </label>
                            </div>
                            {/* <div className='col-md-4'>
                            <button className="btn btn-primary theme-button col-md-12" onClick={handleProductSearch} 
                                                dangerouslySetInnerHTML={{__html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : t("barcode-button")}}/>
                            </div> */}
                        </div>
                                    <div className="print-area" style={{width: paperSize.a4.width, height: '100%'}} ref={componentRef}>
                                        {subcategoryList.map((product, index)=>(
                                            <div className="bar-code-items" key={index}>
                                                <p><strong>{product.name}</strong></p>
                                                <p>{t("barcode-price")}: {product.serial}€</p>
                                                <div className="barcode">
                                                    <Barcode value={product.slug} width={1} height={100} displayValue={false}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-5 xs:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={handlePrint}
                                    >
                                        {t("barcode-print")}
                                    </button>
                                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

};

export default BarCode