import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Constants from '../../../Constants';
import Pagination from 'react-js-pagination';
import Invoice from './Invoice'
import { useDispatch } from "react-redux"
import { add, removeAll } from "../../store/cartSlice"
import { setTrue, setFalse, setId, setTotalPagado } from "../../store/returnSlice"

import { useNavigate } from "react-router-dom";

export default function OrderData() {
    const [pedidos, setPedidos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [invoiceShow, setInvoiceShow] = useState(false);
    const [pedidoPrint, setPedidoPrint] = useState([]);
    const [tax, setTax] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const [input, setInput] = useState({
        order_by : 'transaction_id',
        per_page : 5,
        direction : 'asc',
        search : '',
    });

    const handleReturn = (productos, id, total) => {
        dispatch(removeAll());
        productos.forEach(element => {
            const { id, name, serial, quantity} = element;
            const newData = { id, name, serial : serial, quantity: quantity };
            if (quantity > 0) {
                dispatch(add(newData))
            }
        });
        dispatch(setTrue());
        dispatch(setId(id));
        dispatch(setTotalPagado(total));
        navigate('/cartmenu');
    }

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const handleRemoveCart = () => {
        dispatch(removeAll());
    }

    const getPedidos = (pageNumber=1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/pedidos?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then(res=>{
            setPedidos(res.data.data);
            setItemsCountPerPage(res.data.meta.per_page);
            setStartFrom(res.data.meta.from);
            setTotalItemsCount(res.data.meta.total)
            setActivePage(res.data.meta.current_page)
            setIsLoading(false);
        })
    }

    const showInvoice = (pedido) => {
        setPedidoPrint(pedido);
        setTax((21 / 100) * pedido.total);
        setInvoiceShow(true);
    }

    const closeInvoice = () => {
        setPedidoPrint([]);
        setInvoiceShow(false);
    }
    
    useEffect(()=>{
        getPedidos();
    }, [])
    
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-center text-white pb-2">HISTORIAL DE PEDIDOS</h1>
                </div>
            </div>
            <div className="sm:flex sm:items-center">
                <div className='search-area w-full'>
                    <div className='row align-items-center'>
                        <div className='col'>
                            <label className='w-100 search-label text-white text-center'>
                                <p>Factura</p>
                                <input
                                    className="form-control form-control-sm"
                                    type={'search'}
                                    name={'search'}
                                    value={input.search}
                                    onChange={handleInput}
                                    placeholder={'Search...'}
                                />
                            </label>
                        </div>
                        <div className='col'>
                            <label className='w-100  text-white text-center'>
                                <p>Páginas</p>
                                <select
                                     className="form-select form-select-sm"
                                    name={'per_page'}
                                    value={input.per_page}
                                    onChange={handleInput}
                                >
                                    <option value={'5'}>5</option>
                                    <option value={'10'}>10</option>
                                    <option value={'25'}>25</option>
                                    <option value={'50'}>50</option>
                                    <option value={'100'}>100</option>
                                </select>
                            </label>
                        </div>
                        <div className='col'>
                            <div className="d-grid">
                                <button className="btn  btn-primary theme-button" onClick={()=>getPedidos(1)}>
                                    <i className='fa-solid fa-magnifying-glass'/> Search</button>
                            </div>
                        </div>
                        <div className='col'>
                            <div onClick={handleRemoveCart} className="d-grid">
                                <Link className='inline-flex items-center btn btn-warning justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto text-decoration-none' to="/">Home</Link>
                            </div>
                        </div>
                        <div className='col'>
                            <div onClick={handleRemoveCart} className="d-grid">
                                <Link className='inline-flex items-center btn btn-danger justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto text-decoration-none' to="/cartmenu">Cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300 table-dark my-table table table-hover table-striped table-bordered">
                                <thead className="bg-[#060c18]">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white sm:pl-6">
                                            Número de Compra (#)
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white sm:pl-6">
                                            Comprador
                                        </th>
                                        <th colspan="3" scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white col-2">
                                            Productos
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
                                            Total Productos
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
                                            Forma Pago
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
                                            Total
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
                                            SubTotal
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
                                            Fecha
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-[#0e1227] pedidosTable">
                                    {pedidos.map((curr, i) => (
                                        <tr key={i}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6">
                                                {curr.transaction_id}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6">
                                                {curr.comprador}
                                            </td>
                                            <td colspan="3" className="whitespace-nowrap px-3 py-4 text-sm text-center text-white">
                                                <ul>
                                                    {Object.keys(curr.productos).map((product) => (
                                                        <>
                                                        <li><p class="fw-bold"></p> {curr.productos[product].name}</li>
                                                        <li><p class="fw-bold">x {curr.productos[product].quantity}</p></li>
                                                        </>
                                                    ))}
                                                </ul>    
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-white">{curr.totalproductos}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-white">{curr.formaPago}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-white">{curr.total} €</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-white">{curr.subTotal} €</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-white">{curr.created_at}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-1">
                                                <button onClick={()=>showInvoice(curr)} className={'btn btn-sm btn-warning my-1'}>
                                                    <i className="fa-solid fa-print" style={{color:"#ffffff"}}/> 
                                                </button>
                                                <button onClick={()=>handleReturn(curr.productos, curr.transaction_id, curr.subTotal)} className={'btn btn-sm btn-danger my-1'}>
                                                    <i className="fa-solid fa-rotate-left"/> 
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {invoiceShow && 
                                    <Invoice
                                        closeInvoice={closeInvoice}
                                        paymentMode={pedidoPrint.formaPago}
                                        transId={pedidoPrint.transaction_id}
                                        total={pedidoPrint.total}
                                        subTotal={pedidoPrint.subTotal}
                                        tax={tax}
                            />} 

                            {pedidos.length === 0 && (<p className="text-white text-center mt-4 mb-4">Sin Pedidos que Correspondan.</p>)}
                            <div className='card-footer d-flex justify-content-center'>
                            <nav className='pagination-sm'>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getPedidos}
                                    nextPageText={'Next'}
                                    firstPageText={'First'}
                                    prevPageText={'Previous'}
                                    lastPageText={'Last'}
                                    itemClass={'page-item'}
                                    linkClass={'page-link'}
                                />
                            </nav>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
