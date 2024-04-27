import React, { useEffect, useState } from 'react';
import PageHead from '../../partials/PageHead';
import CardHeader from "../../partials/miniComponent/CardHeader";
import Constants from '../../../Constants';
import axios from 'axios';

const CategoryList = () => {

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axios.get(`${Constants.BASE_URL}/category`).then(res=>{
            console.log(res.data)
        })
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
                                        <tr>
                                            <td>SL</td>
                                            <td>Name / Slug</td>
                                            <td>Serial / Status</td>
                                            <td>Photo</td>
                                            <td>Created By</td>
                                            <td>Created At</td>
                                            <td>Action</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryList;