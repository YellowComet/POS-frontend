import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { useSelector } from "react-redux"
// import { selectTotal } from '../../store/cartSlice'
import { useReactToPrint } from 'react-to-print';
import Link from '../../../assets/img/link.png';
import axios from 'axios';
import Constants from '../../../Constants';

export default function Invoice({ closeInvoice, paymentMode, transId, total, subTotal, tax }) {
    const [open, setOpen] = useState(true)
    // const cart = useSelector(state => state.cart);
    // const customer = useSelector(state => state.customer);
    const componentRef = useRef();
    // const total = useSelector(selectTotal);
    // const tax = (5.25 / 100) * total;
    // const cancelButtonRef = useRef(null);
    const [pedido, setPedido] = useState();
    const allEvents = () => {
        handlePrint();
        setOpen(false);
        closeInvoice();
    }

    const getPedido = () => {
        axios.get(`${Constants.BASE_URL}/get-pedido/${transId}`).then(res=>{
            setPedido(res.data.data[0].productos);
        })
    }

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}/${month}/${year}`;
    }

    function getTime() {
        const time = (new Date().toLocaleTimeString())
        return time;
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(()=>{
        getPedido();
        console.log('Invoice - Total:' + total);
    }, [])

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog ref={componentRef} as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div>
                                        <div class="text-center">
                                            <img alt='Logo' className="rounded ticketLogo mx-auto d-block" src={Link}/>
                                        </div>
                                        <h3 className='text-2xl font-semibold tracking-wider text-center'>Diego Miret Shop</h3>
                                    </div>
                                    <div className='flex items-center justify-between '>
                                        <div className='text-xs'>
                                            <h6 >Paseo Santa Maria de la Cabeza 85</h6>
                                            <p>Madrid, 28045</p>
                                            <p >Teléfono : +34687263299 Fax:(503)1234567</p>
                                        </div>
                                        <div className='text-xs'>
                                            <h6 className='flex'><p className='font-semibold'>Día</p>: {getDate()}</h6>
                                            <h6 className='flex'><p className='font-semibold'>Hora</p>: {getTime()}</h6>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between pt-2'>
                                        <div className='text-xs'>
                                            <h6><p className='font-semibold'>Comprador: </p></h6>
                                            {/* <p className='flex'>Customer name : <p className='pl-10'>{customer[0]?.name}</p></p> */}
                                            {/* <p className='flex'>Customer Phone : <p className='pl-8'>+91 {customer[0]?.phone}</p></p> */}
                                            {/* <p className=''>Customer email : sam@gmail.com</p> */}
                                        </div>
                                        <div className='text-xs'>
                                            <h6 className='flex'><p className='font-semibold'>Nº Factura</p> : &nbsp; #{transId}</h6>
                                        </div>
                                    </div>
                                    <h6 className='text-xs font-bold text-center pt-3'>Bienvenido a Diego Shop</h6>
                                    <div className='mt-3 w-full'>
                                        <table style={{
                                            fontSize: "11px"
                                        }} className='font-normal divide-x divide-y divide-gray-300 '>
                                            <tr className='divide-x border-t border-gray-200 border-r border-l  divide-gray-300'>
                                                <th className='px-2  text-center p-1'>Producto</th>
                                                <th className='px-2  text-center p-1'>Cantidad</th>
                                                <th className='px-2  text-center p-1'>Precio(€)</th>
                                                <th className='px-2  text-center p-1'>Total(€)</th>
                                            </tr>
                                            {pedido?.map((curr, i) => ( 
                                                <tr className='divide-x  divide-gray-300 border-b  border-gray-200'>
                                                        <>
                                                        <td className='px-2 text-center py-1'>{curr.name}</td>
                                                        <td className='px-2 text-center py-1'>{curr.quantity}</td>
                                                        <td className='px-2 text-center py-1'>{(curr.serial) / (curr.quantity)} €</td>
                                                        <td className='px-2 text-center py-1'>{curr.serial} €</td>
                                                        </>
                                                </tr>
                                            ))} 
                                        </table>
                                    </div>
                                    <div className='flex justify-between text-xs pt-4'>
                                        <div></div>
                                        <div className='pr-4'>
                                            <div className='flex space-x-9'>
                                                <p>Total : </p>
                                                <p> {total} €</p>
                                            </div>
                                            <div className='flex space-x-9'>
                                                <p>IVA(%): </p>
                                                <p>21%</p>
                                            </div>
                                            <div className='flex space-x-8'>
                                                <p>IVA(€): </p>
                                                <p> {tax.toFixed(2)} €</p>
                                            </div>
                                            <div className='flex space-x-5'>
                                                <p>Subtotal :  </p>
                                                <p> {(subTotal).toFixed(2)} €</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between pr-7 pt-3'>
                                        <p></p>
                                        <p className='text-xs'>Status: <strong>Paid {paymentMode}</strong>. </p>
                                    </div>
                                </div>
                                <div className='flex flex-col pt-8 leading-snug'>
                                    <small className=''>Please Contact for any queries realted to Invoice.</small>
                                    <small className='font-medium'>THANKS YOU FOR YOUR VISIT.</small>
                                </div>
                                <div className="mt-5 xs:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        onClick={allEvents}
                                    >
                                        Print Invoice
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}