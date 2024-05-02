import React, {useEffect, useState} from "react";
import PageHead from '../../partials/PageHead';
import axios from 'axios';
import Constants from '../../../Constants';
import Swal from 'sweetalert2';
import CardHeader from "../../partials/miniComponent/CardHeader";
import { useNavigate } from "react-router-dom";

const SupplierAdd = () => {

    const [input, setInput] = useState({status : 1});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    //Get Locations
    const [cas, setCas] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);

    const getCAs = () => {
        axios.get(`${Constants.BASE_URL}/cas`).then(res=>{
            setCas(res.data);
        })
    }
    const getProvincias = (ca_id) => {
        axios.get(`${Constants.BASE_URL}/provincias/${ca_id}`).then(res=>{
            setProvincias(res.data);
        })
    }
    const getCiudades = (provincia_id) => {
        axios.get(`${Constants.BASE_URL}/ciudades/${provincia_id}`).then(res=>{
            setCiudades(res.data);
        })
    }




    const handleInput = (e) => {
        if(e.target.name === 'ca_id'){
            setProvincias([]);
            setCiudades([]);
            let ca_id = parseInt(e.target.value);
            if(!isNaN(ca_id))
            {
                getProvincias(e.target.value);
            }
        }else if(e.target.name === 'provincia_id')
        {
            setCiudades([]);
            let provincia_id = parseInt(e.target.value);
            if(!isNaN(provincia_id))
            {
                getCiudades(e.target.value);
            }
        }
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const handleLogo = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            setInput(prevState => ({...prevState, logo: reader.result}))
        }
        reader.readAsDataURL(file)
    }

    const handleSupplierCreate = () => {
        setIsLoading(true);
        axios.post(`${Constants.BASE_URL}/supplier`, input).then(res=>{
            setIsLoading(false)
            Swal.fire({
                position: "top-end",
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast:true,
                timer: 1500
            });
            navigate('/supplier')
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
        getCAs();
    }, []);

    return (
        <>
            <PageHead title={'Supplier'} title2={'Add Supplier'} pageTitle={'Add Supplier'}/>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                    <div className="card-header">
                        <CardHeader 
                            title={'Add Supplier'}
                            link={'/supplier'}
                            icon={'fa-list'}
                            button_text={'List'}
                        />
                    </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Supplier Details</h5>
                                        </div>
                                        <div className="card-body">
                                                <label className="w-100">
                                                    <p>Company Name</p>
                                                    <input
                                                        className={errors.name !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        type={'text'}
                                                        name={'name'}
                                                        value={input.name}
                                                        onChange={handleInput}
                                                        placeholder={'Enter Company Name'}
                                                    />
                                                    <p className="login-error-msg">
                                                    <small>{errors.name !== undefined ? errors.name[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Phone</p>
                                                    <input
                                                        className={errors.phone !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        type={'text'}
                                                        name={'phone'}
                                                        value={input.phone}
                                                        onChange={handleInput}
                                                        placeholder={'Enter Phone Number'}
                                                    />
                                                    <p className="login-error-msg">
                                                    <small>{errors.phone !== undefined ? errors.phone[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Email</p>
                                                    <input
                                                        className={errors.email !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        type={'text'}
                                                        name={'email'}
                                                        value={input.email}
                                                        onChange={handleInput}
                                                        placeholder={'Enter Email'}
                                                    />
                                                    <p className="login-error-msg">
                                                    <small>{errors.email !== undefined ? errors.email[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Status</p>
                                                    <select
                                                        className={errors.status !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        name={'status'}
                                                        value={input.status}
                                                        onChange={handleInput}
                                                        placeholder={'Select Supplier Status'}
                                                    >
                                                        <option disabled={true}>Select Supplier Status</option>
                                                        <option value={1} selected="selected">Active</option>
                                                        <option value={0}>Inactive</option>
                                                    </select>
                                                    <p className="login-error-msg">
                                                    <small>{errors.statusv !== undefined ? errors.status[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Details</p>
                                                    <textarea
                                                        className={errors.details !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        name={'details'}
                                                        value={input.details}
                                                        onChange={handleInput}
                                                        placeholder={'Enter Supplier Details'}
                                                    />
                                                    <p className="login-error-msg">
                                                    <small>{errors.details !== undefined ? errors.details[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Logo</p>
                                                    <input
                                                        className={errors.logo !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        type={'file'}
                                                        name={'logo'}
                                                        onChange={handleLogo}
                                                        placeholder={'Enter Logo'}
                                                    />
                                                    <p className="login-error-msg">
                                                    <small>{errors.logo !== undefined ? errors.logo[0] : null}</small>
                                                    </p>
                                                </label>
                                                {input.logo !== undefined ?
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <div className="photo-preview mt-3">
                                                                <img alt="Preview" src={input.logo} className="img-thumbnail aspect-one" />
                                                            </div>
                                                        </div>
                                                    </div> : null
                                                }  
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                        <div className="card">
                                            <div className="card-header">
                                                <h5>Supplier Address</h5>
                                            </div>
                                            <div className="card-body">
                                                <label className="w-100">
                                                    <p>Address</p>
                                                    <input
                                                        className={errors.address !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        type={'text'}
                                                        name={'address'}
                                                        value={input.address}
                                                        onChange={handleInput}
                                                        placeholder={'Enter Address'}
                                                    />
                                                    <p className="login-error-msg">
                                                    <small>{errors.address !== undefined ? errors.address[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Select Comunidad Autónoma</p>
                                                    <select
                                                        className={errors.ca_id !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        name={'ca_id'}
                                                        value={input.ca_id}
                                                        onChange={handleInput}
                                                    >
                                                        <option>Select CA</option>
                                                        {cas.map((ca, index)=>(
                                                            <option key={index} value={ca.id}>{ca.name}</option>
                                                        ))}
                                                    </select>
                                                    <p className="login-error-msg">
                                                    <small>{errors.ca_id !== undefined ? errors.ca_id[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Select Provincia</p>
                                                    <select
                                                        className={errors.provincia_id !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        name={'provincia_id'}
                                                        value={input.provincia_id}
                                                        onChange={handleInput}
                                                        disabled={Object.keys(provincias).length < 1}
                                                    >
                                                        <option>Select Provincia</option>
                                                        {provincias.map((provincia, index)=>(
                                                            <option key={index} value={provincia.id}>{provincia.name}</option>
                                                        ))}
                                                    </select>
                                                    <p className="login-error-msg">
                                                    <small>{errors.provincia_id !== undefined ? errors.provincia_id[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Select Ciudad</p>
                                                    <select
                                                        className={errors.ciudad_id !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        name={'ciudad_id'}
                                                        value={input.ciudad_id}
                                                        onChange={handleInput}
                                                        disabled={Object.keys(ciudades).length < 1}
                                                    >
                                                        <option>Select Ciudad</option>
                                                        {ciudades.map((ciudad, index)=>(
                                                            <option key={index} value={ciudad.id}>{ciudad.name}</option>
                                                        ))}
                                                    </select>
                                                    <p className="login-error-msg">
                                                    <small>{errors.ciudad_id !== undefined ? errors.ciudad_id[0] : null}</small>
                                                    </p>
                                                </label>
                                                <label className="w-100">
                                                    <p>Landmark</p>
                                                    <input
                                                        className={errors.landmark !== undefined ? 'form-control mt-2 is-invalid' : 'form-control mt-2'}
                                                        type={'text'}
                                                        name={'landmark'}
                                                        value={input.landmark}
                                                        onChange={handleInput}
                                                        placeholder={'Enter Landmark'}
                                                    />
                                                    <p className="login-error-msg">
                                                    <small>{errors.landmark !== undefined ? errors.landmark[0] : null}</small>
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>          
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className="d-grid mt-4">
                                                <button className="btn btn-primary theme-button" onClick={handleSupplierCreate} 
                                                dangerouslySetInnerHTML={{__html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...' : 'Add Supplier'}}/>
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

export default SupplierAdd;