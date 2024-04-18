import React, { useEffect, useState } from 'react';
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

    // useEffect(()=> {
    //     if(localStorage.token !== undefined){
    //         navigate('/')
    //     }
    // })

    return (
        <>
            <div class="container">

                {/* <!-- Outer Row --> */}
                <div class="row justify-content-center">

                    <div class="col-xl-10 col-lg-12 col-md-9">

                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div class="row">
                                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div class="col-lg-6">
                                        <div class="p-5">
                                            <div class="text-center">
                                                <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            {/* <form class="user"> */}
                                                <div class="form-group">
                                                    <input type="email" class="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        onChange={handleInput} name={'email'} value={input.email} placeholder="Enter Email Address..."/>
                                                </div>
                                                <div class="form-group">
                                                    <p class="login-error-msg"><small>{errors.email !== undefined ? errors.email[0] : null}</small></p>
                                                </div>
                                                <div class="form-group">
                                                    <input type="password" class="form-control form-control-user"
                                                        id="exampleInputPassword" onChange={handleInput} name={'password'}  value={input.password} placeholder="Password"/>
                                                </div>
                                                <div class="form-group">
                                                    <p class="login-error-msg"><small>{errors.password !== undefined ? errors.password[0] : null}</small></p>
                                                </div>
                                                <div class="form-group">
                                                    <div class="custom-control custom-checkbox small">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck"/>
                                                        <label class="custom-control-label" for="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                </div>
                                                <button onClick={handleLogin} class="btn btn-primary btn-user btn-block" dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Login...' : 'Login'}}>
                                                    {/* Login */}
                                                </button>
                                                <hr/>
                                                <a href="index.html" class="btn btn-google btn-user btn-block">
                                                    <i class="fab fa-google fa-fw"></i> Login with Google
                                                </a>
                                                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                                    <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                </a>
                                            {/* </form> */}
                                            <hr/>
                                            <div class="text-center">
                                                <a class="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div class="text-center">
                                                <a class="small" href="register.html">Create an Account!</a>
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