import React, {useState} from "react";
import PageHead from '../../partials/PageHead';
import axios from 'axios';
import Constants from '../../../Constants';
import Swal from 'sweetalert2';
import CardHeader from "../../partials/miniComponent/CardHeader";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const AddCategory = () => {

    const [input, setInput] = useState({status : 1});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

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

    const handleCategoryCreate = () => {
        setIsLoading(true);
        axios.post(`${Constants.BASE_URL}/category`, input).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            });
            navigate('/category')
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


    return (
        <>
            <PageHead title={t("category-tittle")} title2={t("category-tittle2")} pageTitle={t("category-head")}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                    <div className="card-header">
                        <CardHeader 
                            title={t("category-tittle2")}
                            link={'/category'}
                            icon={'fa-list'}
                            button_text={'List'}
                        />
                    </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>{t("category-name")}</p>
                                        <input
                                            className={errors.name !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'text'}
                                            name={'name'}
                                            value={input.name}
                                            onChange={handleInput}
                                            placeholder={t("category-enter-name")}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.name !== undefined ? errors.name[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>{t("category-slug")}</p>
                                        <input
                                            className={errors.slug !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'text'}
                                            name={'slug'}
                                            value={input.slug}
                                            onChange={handleInput}
                                            placeholder={t("category-enter-slug")}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.slug !== undefined ? errors.slug[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>{t("category-serial")}</p>
                                        <input
                                            className={errors.serial !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'number'}
                                            name={'serial'}
                                            value={input.serial}
                                            onChange={handleInput}
                                            placeholder={t("category-enter-serial")}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.serial !== undefined ? errors.serial[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>{t("category-status")}</p>
                                        <select
                                            className={errors.status !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name={'status'}
                                            value={input.status}
                                            onChange={handleInput}
                                            placeholder={t("category-status-select")}
                                        >
                                            <option disabled={true}>{t("category-status-select")}</option>
                                            <option value={1}>{t("category-status-active")}</option>
                                            <option value={0}>{t("category-status-inactive")}</option>
                                        </select>
                                        <p className="login-error-msg">
                                        <small>{errors.status !== undefined ? errors.status[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>{t("category-description")}</p>
                                        <textarea
                                            className={errors.description !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            name={'description'}
                                            value={input.description}
                                            onChange={handleInput}
                                            placeholder={t("category-enter-description")}
                                        />
                                        <p className="login-error-msg">
                                        <small>{errors.description !== undefined ? errors.description[0] : null}</small>
                                        </p>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <label className="w-100 mt-4">
                                        <p>{t("category-photo")}</p>
                                        <input
                                            className={errors.photo !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                            type={'file'}
                                            name={'photo'}
                                            onChange={handlePhoto}
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
                                                <button className="btn btn-primary theme-button" onClick={handleCategoryCreate} 
                                                dangerouslySetInnerHTML={{__html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : t("category-addbutton")}}/>
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

export default AddCategory;
