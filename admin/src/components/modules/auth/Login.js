import React, { useState } from 'react';
import axios from 'axios';
// import {useNavigate} from 'react-router-dom';

const Login = () => {

    // const navigate = useNavigate();
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


    const handleInput = (e) => setInput(prevState => ({...prevState, [e.target.name] : e.target.value}));

    const handleLogin =  () => {
        setIsLoading(true);
        axios.post('http://localhost:8000/api/login', input).then(res=>{
            localStorage.email = res.data.email
            localStorage.name = res.data.name
            localStorage.photo = res.data.photo
            localStorage.phone = res.data.phone
            localStorage.token = res.data.token
            setIsLoading(false);
            window.location.reload()
        }).catch(errors => {
            if(errors.response.status === 422){
                setIsLoading(false);
                const $prueba = errors.response.data.errors;
                setErrors($prueba);
            }
        })

    }

    return (
        <>
            <div className="container">

                {/* <!-- Outer Row --> */}
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            {/* <form className="user"> */}
                                                <div className="form-group">
                                                    <input type="email" className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        onChange={handleInput} name={'email'} value={input.email} placeholder="Enter Email Address..."/>
                                                </div>
                                                <div className="form-group">
                                                    <p className="login-error-msg"><small>{errors.email !== undefined ? errors.email[0] : null}</small></p>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                        id="exampleInputPassword" onChange={handleInput} name={'password'}  value={input.password} placeholder="Password"/>
                                                </div>
                                                <div className="form-group">
                                                    <p className="login-error-msg"><small>{errors.password !== undefined ? errors.password[0] : null}</small></p>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <button onClick={handleLogin} className="btn btn-primary btn-user btn-block" dangerouslySetInnerHTML={{__html: isLoading ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Login...' : 'Login'}}>
                                                    {/* Login */}
                                                </button>
                                                <hr/>
                                                <a href="index.html" className="btn btn-google btn-user btn-block">
                                                    <i className="fab fa-google fa-fw"></i> Login with Google
                                                </a>
                                                <a href="index.html" className="btn btn-facebook btn-user btn-block">
                                                    <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                </a>
                                            {/* </form> */}
                                            <hr/>
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="small" href="register.html">Create an Account!</a>
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

export default Login;