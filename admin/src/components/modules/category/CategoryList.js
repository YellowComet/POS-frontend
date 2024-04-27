import React, { useEffect, useState } from 'react';
import PageHead from '../../partials/PageHead';
import CardHeader from "../../partials/miniComponent/CardHeader";
import Constants from '../../../Constants';
import axios from 'axios';
import CategoryPhotoModal from '../../partials/modals/CategoryPhotoModal';
import Pagination from 'react-js-pagination';

const CategoryList = () => {

    const [input, setInput] = useState({
        order_by : 'serial',
        per_page : 5,
        direction : 'asc',
        search : '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const [categories, setCategories] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const getCategories = (pageNumber=1) => {
        axios.get(`${Constants.BASE_URL}/category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then(res=>{
            setCategories(res.data.data);
            setItemsCountPerPage(res.data.meta.per_page);
            setStartFrom(res.data.meta.from);
            setTotalItemsCount(res.data.meta.total)
            setActivePage(res.data.meta.current_page)

        })
    }

    const handlePhotoModal = (photo) => {
        setModalPhoto(photo);
        setModalShow(true);
    }

    useEffect(()=>{
        getCategories()
    }, [])

    return (
        <>
            <PageHead title={'Category'} title2={'Category List'} pageTitle={'Category List'}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader 
                                title={'Category List'}
                                link={'/category/create'}
                                icon={'fa-add'}
                                button_text={'Add Category'}
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
                                                <option value={'serial'}>Serial</option>
                                                <option value={'status'}>Status</option>
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
                                            <button className="btn  btn-primary theme-button" onClick={()=>getCategories(1)}>
                                                <i className='fa-solid fa-magnifying-glass'/> Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='table-responsive'>
                                <table className={'my-table table table-hover table-striped table-bordered'}>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name / Slug</th>
                                            <th>Serial / Status</th>
                                            <th>Photo</th>
                                            <th>Created By</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category, index)=>(
                                            <tr key={index}>
                                                <td>{startFrom + index}</td>
                                                <td>
                                                    <p>Name: {category.name}</p>
                                                    <p>Slug: {category.slug}</p>
                                                </td>
                                                <td>
                                                    <p className={'text-theme'}>Serial: {category.serial}</p>
                                                    <p className={'text-success'}>Status: {category.status}</p>
                                                </td>
                                                <td>
                                                    <img 
                                                        onClick={()=>handlePhotoModal(category.photo_full)}
                                                        src={category.photo} alt={category.name}
                                                        className={'img-thumbnail table-image'}
                                                    />
                                                </td>
                                                <td>{category.created_by}</td>
                                                <td>
                                                    <p><small>Created: {category.created_at}</small></p>
                                                    <p><small>Updated: {category.updated_at}</small></p>
                                                </td>
                                                <td>Action</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <CategoryPhotoModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    tittle={'Category Photo'}
                                    size={''}
                                    photo={modalPhoto}
                                />
                            </div>
                        </div>
                        <div className='card-footer'>
                            <nav className='pagination-sm'>
                                <Pagination
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={5}
                                    onChange={getCategories}
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

export default CategoryList;