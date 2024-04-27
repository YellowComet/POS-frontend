import React, { useEffect, useState } from 'react';
import PageHead from '../../partials/PageHead';
import CardHeader from "../../partials/miniComponent/CardHeader";
import Constants from '../../../Constants';
import axios from 'axios';
import CategoryPhotoModal from '../../partials/modals/CategoryPhotoModal';

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');

    const getCategories = () => {
        axios.get(`${Constants.BASE_URL}/category`).then(res=>{
            setCategories(res.data.data);
        })
    }

    const handlePhotoModal = (photo) => {
        setModalPhoto(photo);
        setModalShow(true);
    }

    useEffect(()=>{
        getCategories()
    })

    return (
        <>
            <PageHead title={'Category'} title2={'Category List'} pageTitle={'Category List'}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <CardHeader 
                                title={'Category List'}
                                link={'/category/create'}
                                icon={'fa-add'}
                                button_text={'Add Category'}
                            />
                        </div>
                        <div className='card-body'>
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
                                            <tr>
                                                <td>{++index}</td>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;