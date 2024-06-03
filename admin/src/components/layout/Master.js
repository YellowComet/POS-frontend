import React from 'react';
import $ from 'jquery';
import link from './../../assets/img/link.png';
import Sidebar from "./../partials/Sidebar";
import Footer from "./../partials/Footer";
import {Outlet} from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Constants from '../../Constants';
import GlobalFunction from '../../GlobalFunction';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../partials/LanguageSwitcher';
import i18n from '../../i18n';

const Master = () => {

    const handleSidebar = () => {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
    }

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Logout!",
                text: "Your session has ended.",
                icon: "success"
              });
              axios.post(`${Constants.BASE_URL}/logout`).then(res=>{
                GlobalFunction.logOut()
                window.location.reload()
            }).catch(errors => {
                GlobalFunction.logOut()
            })
            }
          });
    }

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        console.log("hola");
    };

    const { t } = useTranslation();

    return (
    <>
        <div id="wrapper">
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <button onClick={handleSidebar} id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>
                    <button onClick={() => changeLanguage('en')}>English</button>
                    <button onClick={() => changeLanguage('es')}>Español</button>
                    <form
                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder={t('search-text')}
                                aria-label="Search" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    <ul className="navbar-nav ml-auto">

                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <button className="nav-link dropdown-toggle" id="searchDropdown"
                                data-bs-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2"/>
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                        <li className="nav-item dropdown no-arrow mr-5">
                            <button className="nav-link dropdown-toggle" id="userDropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{localStorage.name !== undefined ? localStorage.name : null}</span>
                                <img alt='logo' className="img-profile rounded-circle"
                                    src={link}/>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <button className="dropdown-item" >
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    {t("profile")}
                                </button>
                                <button className="dropdown-item" >
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    {t("settings")}
                                </button>
                                <button className="dropdown-item">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </button>
                                <div className="dropdown-divider"></div>
                                <button onClick={handleLogout} className="dropdown-item">

                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </button>
                            </div>
                        </li>

                    </ul>

                    </nav>
                    <div className="container-fluid">
                        <Outlet/>
                    </div>
                </div>  
                <Footer/>
            </div>          
        </div>
    </>
    );
};

export default Master;