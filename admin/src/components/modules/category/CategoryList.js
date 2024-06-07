import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';

const CategoryList = () => {

    const { t } = useTranslation();

    const [input, setInput] = useState({
        order_by : 'serial',
        per_page : 5,
        direction : 'asc',
        search : '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState([]);

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);

    const [categories, setCategories] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalPhotoShow, setModalPhotoShow] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const getCategories = (pageNumber=1) => {
        setIsLoading(true);
        axios.get(`${Constants.BASE_URL}/category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then(res=>{
            setCategories(res.data.data);
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

    const handleDetailsModal = (category) => {
        setCategory(category);
        setModalShow(true);
    }

    const handleCategoryDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Category will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`${Constants.BASE_URL}/category/${id}`).then(res=>{
                getCategories()
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

    return (
        <>
            <PageHead title={t("categorylist-tittle")} title2={t("categorylist-tittle2")} pageTitle={t("categorylist-head")}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <CardHeader 
                                title={t("categorylist-tittle2")}
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
                                            <p>{t("categorylist-search")}</p>
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
                                            <p>{t("categorylist-order")}</p>
                                            <select
                                                className="form-select form-select-sm"
                                                name={'order_by'}
                                                value={input.order_by}
                                                onChange={handleInput}
                                            >
                                                <option value={'name'}>{t("categorylist-order-name")}</option>
                                                <option value={'created_at'}>{t("categorylist-order-create")}</option>
                                                <option value={'updated_at'}>{t("categorylist-order-update")}</option>
                                                <option value={'serial'}>{t("categorylist-order-serial")}</option>
                                                <option value={'status'}>{t("categorylist-order-status")}</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className='col-md-2'>
                                        <label className='w-100'>
                                            <p>{t("categorylist-order-direction")}</p>
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
                                            <p>{t("categorylist-order-perpage")}</p>
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
                                                <i className='fa-solid fa-magnifying-glass'/> {t("categorylist-order-search")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isLoading ? <Loader/> :
                                <div className='table-responsive soft-landing'>
                                    <table className={'my-table table table-hover table-striped table-bordered'}>
                                        <thead>
                                            <tr>
                                                <th>{t("categorylist-index")}</th>
                                                <th>{t("categorylist-nameslug")}</th>
                                                <th>{t("categorylist-serialstatus")}</th>
                                                <th>{t("categorylist-photo")}</th>
                                                <th>{t("categorylist-createdby")}</th>
                                                <th>{t("categorylist-createdat")}</th>
                                                <th>{t("categorylist-action")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(categories).length > 0 ? categories.map((category, index)=>(
                                                <tr key={index}>
                                                    <td>{startFrom + index}</td>
                                                    <td>
                                                        <p>{t("categorylist-name")}: {category.name}</p>
                                                        <p>{t("categorylist-slug")}: {category.slug}</p>
                                                    </td>
                                                    <td>
                                                        <p className={'text-theme'}>{t("categorylist-serial")}: {category.serial}</p>
                                                        <p className={'text-success'}>{t("categorylist-status")}: {category.status}</p>
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
                                                        <p><small>{t("categorylist-created")}: {category.created_at}</small></p>
                                                        <p><small>{t("categorylist-updated")}: {category.updated_at}</small></p>
                                                    </td>
                                                    <td>
                                                        <button onClick={()=>handleDetailsModal(category)} className={'btn btn-sm btn-info my-1'}>
                                                            <i className="fa-solid fa-eye" style={{color:"#ffffff"}}/> 
                                                        </button>
                                                        <Link to={`/category/edit/${category.id}`}>
                                                            <button className={'btn btn-sm btn-warning my-1 mx-1'}>
                                                                <i className="fa-solid fa-edit" style={{color:"#ffffff"}}/> 
                                                            </button>
                                                        </Link>
                                                        <button onClick={()=>handleCategoryDelete(category.id)} className={'btn btn-sm btn-danger my-1'}>
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
                                        tittle={t("categorylist-modal-photo")}
                                        size={''}
                                        photo={modalPhoto}
                                    />
                                    <CategoryDetailsModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        tittle={t("categorylist-modal-details")}
                                        size={''}
                                        category={category}
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
                                    onChange={getCategories}
                                    nextPageText={t("categorylist-page-next")}
                                    firstPageText={t("categorylist-page-first")}
                                    prevPageText={t("categorylist-page-previous")}
                                    lastPageText={t("categorylist-page-last")}
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