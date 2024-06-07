import React, { useState } from 'react'
import { remove, removeAll, selectTotal, quantityTotal, sum, sub } from '../../store/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollableFeed from "react-scrollable-feed";
import Invoice from './Invoice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import Constants from '../../../Constants';
import { setFalse } from "../../store/returnSlice"
import DiscountModal from '../../partials/modals/DiscountModal';
import { useTranslation } from 'react-i18next';
import PageHead from '../../partials/PageHead';

const CartItems = () => {
    const dispatch = useDispatch();
    const [invoiceShow, setInvoiceShow] = useState(false);
    // const customer = useSelector(state => state.customer);
    const [payment, setPayment] = useState(false);
    const [transId, setTransId] = useState(0);
    const cart = useSelector(state => state.cart);
    const isReturn = useSelector(state => state.return.myBoolean);
    const returnId = useSelector(state => state.return.id);
    const returnTotal = useSelector(state => state.return.totalPagado);
    const [modalShow, setModalShow] = useState(false);

    const cartTotal = useSelector(quantityTotal);
    const total = useSelector(selectTotal);
    const [totalFinal, setTotalFinal] = useState(0);
    const [taxFinal, setTaxFinal] = useState(0);
    const [subTotalFinal, setSubTotalFinal] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [discountNum, setDiscountNum] = useState(0);
    const [paymentMod, setPaymentMod] = useState();


    const totalConDescuentoNum = (total - discountNum);
    const discount = (totalConDescuentoNum * (discountPercent/100));
    const totalConDescuentoPercent = totalConDescuentoNum - discount;
    const tax = (21 / 100) * total;
    const subTotal = totalConDescuentoPercent + tax;

    const { t } = useTranslation();

    const inCreament = (data) => {
        const { id, serial } = data;
        const newData = { id, serial };
        dispatch(sum(newData))
        setInvoiceShow(false);
    }

    const deCreament = (data) => {
        const { id, serial } = data;
        const newData = { id, serial };
        dispatch(sub(newData))
        setInvoiceShow(false);
    }

    const handleRemove = (e, id) => {
        e.preventDefault()
        dispatch(remove(id))
    }

    const showInvoice = () => {
        setInvoiceShow(true);
        setPayment(false);
    }

    const closeInvoice = () => {
        setInvoiceShow(false);
        setPayment(false);
    }

    const finishPay = () => {
        setPayment(false);
    }

    const handleDiscount = () => {
        setModalShow(true);
    }

    const handlePaymentCard = () => {
        handlePayment('Tarjeta');
        setPaymentMod('Tarjeta');
    }

    const handlePaymentCash = () => {
        handlePayment('Cash');
        setPaymentMod('Cash');
    }

    const handlePayment = async (paymentMode) => {
        if(payment){
            return;
        }else {
            const newData = { comprador: 'DIEGO', total: totalConDescuentoPercent, subTotal: subTotal, nproductos: cart.length, descuento: '0', formaPago: paymentMode, totalproductos: cartTotal, productos: cart }
            if(isReturn){
                axios.put(`${Constants.BASE_URL}/pedido/${returnId}`, newData).then(res=>{
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: t("cart-returncorrect"),
                        showConfirmButton: false,
                        toast:true,
                        timer: 1500
                    });
                    setTransId(returnId);
                    }).catch(errors => {
                        console.log(errors);
                    })
            }else{
                axios.post(`${Constants.BASE_URL}/pedido`, newData).then(res=>{
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: t("cart-paidcorrect"),
                    showConfirmButton: false,
                    toast:true,
                    timer: 1500
                });
                setTransId(res.data.transaction_id);
                }).catch(errors => {
                    console.log(errors);
                })
            }
            setPayment(true);
            setTotalFinal(totalConDescuentoPercent);
            setTaxFinal((21 / 100) * totalConDescuentoPercent);
            setSubTotalFinal(totalConDescuentoPercent + tax);
            dispatch(removeAll());
            dispatch(setFalse());
        }
    }

    return (
        <div>
            <PageHead title={t("")} title2={t("")} pageTitle={t("cart-head")}/>
            <ToastContainer />
            <ScrollableFeed >
                {isReturn ? <p className='text-white text-center mt-2'>{t("cart-return")}</p> : null}
                <div className='flex flex-col justify-between text-white bg-[#0e1227]'>
                    <motion.div transition={{ duration: 0.5 }} exit={{ y: "50%", opacity: 0 }} className='flex flex-col px-4 py-4 space-y-1 h-[55vh] overflow-y-scroll scrollbar-hide'>

                        {cart.length > 0 ? (
                            <>
                                <div className=''>
                                <ol className="list-group list-group-numbered">
                                    <ul className="divide-y divide-black cartList">
                                        <AnimatePresence>
                                            {cart.map((curr, index) => (
                                                <motion.li initial={{ x: 100 }} animate={{ x: 0 }} transition={{ duration: 0.2 }} exit={{ y: "50%", opacity: 0, scale: 0.5 }} key={index}>
                                                    {/* <button className="block hover:rounded-md text-decoration-none"> */}
                                                        <div className="px-4 py-2">
                                                            <div className="flex items-center justify-between">
                                                                <p className="truncate text-sm font-medium text-white">{index + 1}. &nbsp;{curr.name} &nbsp; </p>
                                                                <div className="ml-2 flex flex-shrink-0">
                                                                    <p className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-white">
                                                                        {curr.serial}€
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="sm:flex sm:justify-between">
                                                                <div className="sm:flex">
                                                                    <div className='mt-2 flex text-xs space-x-3 items-center cartItems'>
                                                                        <svg onClick={() => inCreament(curr)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer w-5 h-5 bg-[#1f2544] rounded-sm p-1 ">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                        </svg>
                                                                        <p className='font-semibold text-md'>{curr.quantity}</p>
                                                                        <svg onClick={() => deCreament(curr)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="cursor-pointer w-5 h-5 bg-[#1f2544] rounded-sm p-1 ">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                                                        </svg>
                                                                    </div>
                                                                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">

                                                                        &nbsp;<svg onClick={(e) => handleRemove(e, curr.id)} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 cursor-pointer">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                        </svg>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    {/* </button> */}
                                                </motion.li>
                                            ))}
                                        </AnimatePresence>
                                    </ul>
                                    </ol>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='flex flex-col items-center justify-center mt-24'>
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-[#474c54]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    <small className='text-[#474c54]'>{t("cart-noitems")}.</small>
                                </div>
                            </>
                        )}
                    </motion.div>
                    <div className='flex flex-col w-full'>
                        <div>
                            <div className='grid grid-cols-3 gap-0'>
                                <div  onClick={()=>handleDiscount()} className='bg-[#151a34] text-center p-2 text-sm font-semibold hover:bg-[#1f2544] cursor-pointer border border-black rounded-tl-lg'>
                                    <button className='buttonCart btn btn-primary'>{t("cart-discount")}</button>
                                </div>
                                <div onClick={handlePaymentCash} className='bg-[#151a34] text-center p-2 text-sm font-semibold hover:bg-[#1f2544] cursor-pointer border border-black'>
                                    <button className='buttonCart btn btn-primary'>{t("cart-cash")}</button>
                                </div>
                                <div className='bg-[#151a34] text-center p-2 text-sm font-semibold hover:bg-[#1f2544] cursor-pointer border border-black rounded-tr-lg'>
                                    <button className='buttonCart btn btn-primary' onClick={handlePaymentCard} >{t("cart-card")}</button>
                                </div>
                            </div>
                            <div className='flex flex-col pl-8 pr-8 py-2 space-y-2'>
                                {isReturn ?  
                                (
                                <>
                                    <div className='flex flex-row items-center justify-between text-xs font-bold text-gray-600 '><p>{t("cart-paid")}</p><p>{returnTotal.toFixed(2)}€</p></div>
                                    <div className='flex flex-row items-center justify-between text-xs font-bold text-gray-600 '><p>{t("cart-total")}</p><p>{subTotal.toFixed(2)}€</p></div>
                                    <div className='flex flex-row items-center justify-between text-sm font-bold '><p>{t("cart-return2")}</p><p>{(returnTotal - subTotal).toFixed(2)}€</p></div>
                                </>
                                ):(
                                 <>
                                    <div className='flex flex-row items-center justify-between text-xs font-bold text-gray-600 '><p>{t("cart-tax")} 21%</p><p>{tax.toFixed(2)}€</p></div>
                                    <div className='flex flex-row items-center justify-between text-xs font-bold text-gray-600 '><p>{t("cart-subtotal")}</p><p>{total.toFixed(2)}€</p></div>
                                    <div className='flex flex-row items-center justify-between text-xs font-bold text-gray-600 '><p>{t("cart-discount")} (%)</p><p>{discountPercent}%</p></div>
                                    <div className='flex flex-row items-center justify-between text-xs font-bold text-gray-600 '><p>{t("cart-discount")} (€)</p><p>{discountNum} €</p></div>
                                    <div className='flex flex-row items-center justify-between text-sm font-bold '><p>{t("cart-total")}</p><p>{subTotal.toFixed(2)}€</p></div>
                                </>
                                )}
                                {payment && (
                                    <p className='text-center text-xs font-semibold text-green-500'>{t("cart-paymentdone")}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='text-center sm:flex-none space-x-4  p-2 text-sm font-semibold cursor-pointer'>
                        {/* <div className='bg-[#151a34]'> */}
                            <button onClick={showInvoice} className={payment ? ' py-4 text-center btn btn-success' : 'btn btn-danger py-4 text-center cursor-not-allowed border'} >{t("cart-ticket")}</button>
                            <button onClick={finishPay}  className={payment ? ' py-4 text-center btn btn-success' : 'btn btn-danger py-4 text-center cursor-not-allowed border'} >{t("cart-noticket")}</button>
                        {/* </div> */}
                    </div>
                </div>
            </ScrollableFeed>
            <DiscountModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                tittle={'Descuento a Realizar'}
                size={''}
                sendDataPercent={setDiscountPercent}
                sendDataNum={setDiscountNum}

            />
            {invoiceShow && <Invoice closeInvoice={closeInvoice} paymentMod={paymentMod} transId={transId} total={totalFinal} subTotal={subTotalFinal} tax={taxFinal}/>} 
        </div >
    )
}

export default CartItems