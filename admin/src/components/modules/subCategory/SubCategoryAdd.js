import React, {useEffect, useState} from "react";
import PageHead from '../../partials/PageHead';
import axios from 'axios';
import Constants from '../../../Constants';
import Swal from 'sweetalert2';
import CardHeader from "../../partials/miniComponent/CardHeader";
import { useNavigate } from "react-router-dom";

const SubCategoryAdd = () => {

    const [input, setInput] = useState({status : 1});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const getCategories = () => {
        axios.get(`${Constants.BASE_URL}/get-category-list`).then(res=>{
            setCategories(res.data);
        })
    }

    const handleInput = (e) => {
        if(e.target.name === 'name'){
            let slug = e.target.value
            slug = slug.toLowerCase()
            slug = slug.replaceAll(' ', '-')
            setInput(prevState => ({...prevState, slug : slug}))
        }
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }
    const handlePhoto = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            setInput(prevState => ({...prevState, photo: reader.result}))
        }
        reader.readAsDataURL(file)
    }

    const handleSubCategoryCreate = () => {
        setIsLoading(true);
        axios.post(`${Constants.BASE_URL}/sub-category`, input).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            });
            navigate('/sub-category');
        }).catch(errors => {
            setIsLoading(false)
            if(errors.response.status === 422){
                const $prueba = errors.response.data.errors;
                setErrors($prueba);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: errors.response.data.message,
                    showConfirmButton: false,
                    toast:true,
                    timer: 1500
                  });
            }
        })
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <PageHead title={'Sub-Category'} title2={'Add Sub-Category'} pageTitle={'Add Sub-Category'}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                    <div className="card-header">
                        <CardHeader 
                            title={'Add Sub-Category'}
                            link={'/sub-category'}
                            icon={'fa-list'}
                            button_text={'List'}
                        />
                    </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>Select Category</p>
                                        <select
                                            className={errors.category_id !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name={'category_id'}
                                            value={input.category_id}
                                            onChange={handleInput}
                                            placeholder={'Select Category'}
                                        >
                                            <option value={''}>Select Category</option>
                                            {categories.map((category, index)=>(
                                               <option key={index} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                        <p className="login-error-msg">
                                        <small>{errors.category_id !== undefined ? errors.category_id[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>Name</p>
                                        <input
                                            className={errors.name !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'text'}
                                            name={'name'}
                                            value={input.name}
                                            onChange={handleInput}
                                            placeholder={'Enter Sub-Category Name'}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.name !== undefined ? errors.name[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>Slug</p>
                                        <input
                                            className={errors.slug !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'text'}
                                            name={'slug'}
                                            value={input.slug}
                                            onChange={handleInput}
                                            placeholder={'Enter Sub-Category Slug'}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.slug !== undefined ? errors.slug[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>Serial</p>
                                        <input
                                            className={errors.serial !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'number'}
                                            name={'serial'}
                                            value={input.serial}
                                            onChange={handleInput}
                                            placeholder={'Enter Sub-Category Serial'}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.serial !== undefined ? errors.serial[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>Status</p>
                                        <select
                                            className={errors.status !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name={'status'}
                                            value={input.status}
                                            onChange={handleInput}
                                            placeholder={'Select Sub-Category Status'}
                                        >
                                            <option disabled={true}>Select Sub-Category Status</option>
                                            <option value={1} selected="selected">Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                        <p className="login-error-msg">
                                        <small>{errors.status !== undefined ? errors.status[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>Description</p>
                                        <textarea
                                            className={errors.description !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name={'description'}
                                            value={input.description}
                                            onChange={handleInput}
                                            placeholder={'Enter Sub-Category Description'}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.description !== undefined ? errors.description[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>Photo</p>
                                        <input
                                            className={errors.photo !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'file'}
                                            name={'photo'}
                                            onChange={handlePhoto}
                                            placeholder={'Enter Sub-Category Description'}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.photo !== undefined ? errors.photo[0] : null}</small>
                                        </p>
                                    </label>
                                    {input.photo !== undefined ?
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="photo-preview mt-3">
                                                    <img alt="Preview" src={input.photo} className="img-thumbnail aspect-one" />
                                                </div>
                                            </div>
                                        </div> : null
                                    }  
                                </div>
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className="d-grid mt-4">
                                                <button className="btn btn-primary theme-button" onClick={handleSubCategoryCreate} 
                                                dangerouslySetInnerHTML={{__html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Add Sub-Category'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategoryAdd;