import React, { useEffect, useState } from 'react';
import PageHead from '../../partials/PageHead';
import CardHeader from "../../partials/miniComponent/CardHeader";
import Constants from '../../../Constants';
import axios from 'axios';
import CategoryPhotoModal from '../../partials/modals/CategoryPhotoModal';
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';
import CategoryDetailsModal from '../../partials/modals/CategoryDetailsModal';
import Swal from 'sweetalert2';
import Loader from '../../partials/miniComponent/Loader';
import NoDataFound from '../../partials/miniComponent/NoDataFound';

const SupplierList = () => {

    const [input, setInput] = useState({
        order_by : 'created_at',
        per_page : 5,
        direction : 'desc',
        search : '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [supplier, setSupplier] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const [suppliers, setSuppliers] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalPhotoShow, setModalPhotoShow] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const getSuppliers = (pageNumber=1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/supplier?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then(res=>{
            setSuppliers(res.data.data);
            setItemsCountPerPage(res.data.meta.per_page);
            setStartFrom(res.data.meta.from);
            setTotalItemsCount(res.data.meta.total)
            setActivePage(res.data.meta.current_page)
            setIsLoading(false);
        })
    }

    const handlePhotoModal = (photo) => {
        setModalPhoto(photo);
        setModalPhotoShow(true);
    }

    const handleDetailsModal = (supplier) => {
        setSupplier(supplier);
        setModalShow(true);
    }

    const handleSupplierDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Supplier will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`${Constants.BASE_URL}/supplier/${id}`).then(res=>{
                getSuppliers()
                Swal.fire({
                    position: "top-end",
                    icon: res.data.cls,
                    title: res.data.msg,
                    showConfirmButton: false,
                    toast:true,
                    timer: 1500
                });
            })
            }
          });
    }

    useEffect(()=>{
        getSuppliers()
    }, [])

    return (
        <>
            <PageHead title={'Supplier'} title2={'Supplier List'} pageTitle={'Supplier List'}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader 
                                title={'Supplier List'}
                                link={'/supplier/create'}
                                icon={'fa-add'}
                                button_text={'Add Supplier'}
                            />
                        </div>
                        <div className='card-body'>
                            <div className='search-area mb-4'>
                                <div className='row'>
                                    <div className='col-md-3'>
                                        <label className='w-100 search-label'>
                                            <p>Search</p>
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
                                    <div className='col-md-3'>
                                        <label className='w-100'>
                                            <p>Order By</p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'order_by'}
                                                value={input.order_by}
                                                onChange={handleInput}
                                            >
                                                <option value={'name'}>Name</option>
                                                <option value={'created_at'}>Created_at</option>
                                                <option value={'updated_at'}>Updated_at</option>
                                                <option value={'phone'}>Phone</option>
                                                <option value={'email'}>Email</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='col-md-2'>
                                        <label className='w-100'>
                                            <p>Order Direction</p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'direction'}
                                                value={input.direction}
                                                onChange={handleInput}
                                            >
                                                <option value={'asc'}>ASC</option>
                                                <option value={'desc'}>DESC</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='col-md-2'>
                                        <label className='w-100'>
                                            <p>Per Page</p>
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
                                    <div className='col-md-2'>
                                        <div className="d-grid mt-4">
                                            <button className="btn  btn-primary theme-button" onClick={()=>getSuppliers(1)}>
                                                <i className='fa-solid fa-magnifying-glass'/> Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isLoading ? <Loader/> :
                                <div className='table-responsive soft-landing'>
                                    <table className={'my-table table table-hover table-striped table-bordered'}>
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Name</th>
                                                <th>Email / Phone</th>
                                                <th>Status</th>
                                                <th>Logo</th>
                                                <th>Created By</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(suppliers).length > 0 ? suppliers.map((supplier, index)=>(
                                                <tr key={index}>
                                                    <td>{startFrom + index}</td>
                                                    <td>{supplier.name}</td>
                                                    <td>
                                                        <p>Email: {supplier.email}</p>
                                                        <p>Phone: {supplier.phone}</p>
                                                    </td>
                                                    <td>{supplier.status}</td>

                                                    <td>
                                                        <img 
                                                            onClick={()=>handlePhotoModal(supplier.logo_full)}
                                                            src={supplier.logo} alt={supplier.name}
                                                            className={'img-thumbnail table-image'}
                                                        />
                                                    </td>
                                                    <td>{supplier.created_by}</td>
                                                    <td>
                                                        <p><small>Created: {supplier.created_at}</small></p>
                                                        <p><small>Updated: {supplier.updated_at}</small></p>
                                                    </td>
                                                    <td>
                                                        <button onClick={()=>handleDetailsModal(supplier)} className={'btn btn-sm btn-info my-1'}>
                                                            <i className="fa-solid fa-eye" style={{color:"#ffffff"}}/> 
                                                        </button>
                                                        <Link to={`/supplier/edit/${supplier.id}`}>
                                                            <button className={'btn btn-sm btn-warning my-1 mx-1'}>
                                                                <i className="fa-solid fa-edit" style={{color:"#ffffff"}}/> 
                                                            </button>
                                                        </Link>
                                                        <button onClick={()=>handleSupplierDelete(supplier.id)} className={'btn btn-sm btn-danger my-1'}>
                                                            <i className="fa-solid fa-trash"/> 
                                                        </button>
                                                    </td>
                                                </tr>
                                            )): <NoDataFound/>}
                                        </tbody>
                                    </table>
                                    <CategoryPhotoModal
                                        show={modalPhotoShow}
                                        onHide={() => setModalPhotoShow(false)}
                                        tittle={'Supplier Logo'}
                                        size={''}
                                        photo={modalPhoto}
                                    />
                                    <CategoryDetailsModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        tittle={'Supplier Details'}
                                        size={''}
                                        category={supplier}
                                    />
                                </div>
                            }
                        </div>
                        <div className='card-footer'>
                            <nav className='pagination-sm'>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getSuppliers}
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
        </>
    );
};

export default SupplierList;