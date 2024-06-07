import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {

    const clickMenuOpen = () => {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
    }

    const { t } = useTranslation();

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <div className="mt-2 sidebar-brand-text mx-3 text-white text-center"><h4>Yellow_Comet</h4></div>

        <hr className="sidebar-divider my-0"/>

        <li className="nav-item active">
            <Link className="nav-link" to="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>{t("sidebar-dashboard")}</span></Link>
        </li>

        <hr className="sidebar-divider"/>

        <div className="sidebar-heading">
        {t("sidebar-management")}
        </div>

        {/* Category NavBar */}
        <li className="nav-item">
            <button className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i className="fa-solid fa-icons"></i>
                <span> {t("sidebar-categories")}</span> <i className="fas fa-angle-down"></i>
            </button>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">{t("sidebar-components")}:</h6>
                    <Link className="collapse-item" to="/category">
                        <i className="fa-solid fa-list"></i> {t("sidebar-categorylist")}
                    </Link>
                    <Link className="collapse-item" to="/category/create">
                        <i className="fa-solid fa-plus"></i> {t("sidebar-categoryadd")}
                    </Link>
                </div>
            </div>
        </li>

        {/* Sub-Category NavBar */}
        <li className="nav-item">
            <button className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#sub_category"
                aria-expanded="false" aria-controls="collapseTwo">
                <i className="fa-brands fa-product-hunt"></i>
                <span> {t("sidebar-subcategories")}</span> <i className="fas fa-angle-down"></i>
            </button>
            <div id="sub_category" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">{t("sidebar-components")}:</h6>
                    <Link className="collapse-item" to="/sub-category">
                        <i className="fa-solid fa-list"></i> {t("sidebar-subcategorylist")}
                    </Link>
                    <Link className="collapse-item" to="/sub-category/create">
                        <i className="fa-solid fa-plus"></i> {t("sidebar-subcategoryadd")}
                    </Link>
                </div>
            </div>
        </li>

        {/* Sub-Category NavBar */}
        <li className="nav-item">
            <button className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#supplier"
                aria-expanded="false" aria-controls="collapseTwo">
                <i className="fa-solid fa-layer-group"></i>
                <span> {t("sidebar-supplier")}</span> <i className="fas fa-angle-down"></i>
            </button>
            <div id="supplier" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">{t("sidebar-components")}:</h6>
                    <Link className="collapse-item" to="/supplier">
                        <i className="fa-solid fa-list"></i> {t("sidebar-supplierlist")}
                    </Link>
                    <Link className="collapse-item" to="/supplier/create">
                        <i className="fa-solid fa-plus"></i>  {t("sidebar-supplieradd")}
                    </Link>
                </div>
            </div>
        </li>

        <li className="nav-item">
            <button className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i className="fas fa-fw fa-wrench"></i>
                <span> {t("sidebar-utilities")}</span><i className="fas fa-angle-down"></i>
            </button>
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                data-bs-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">{t("sidebar-components")}:</h6>
                    <Link className="collapse-item" to="/cartmenu">{t("sidebar-cart")}</Link>
                    <Link className="collapse-item" to="/orders">{t("sidebar-orders")}</Link>
                    <Link className="collapse-item" to="/barcode">{t("sidebar-barcode")}</Link>
                </div>
            </div>
        </li>

        <hr className="sidebar-divider"/>

        <div className="sidebar-heading">
            Addons
        </div>

        <li className="nav-item">
            <button className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#collapsePages"
                aria-expanded="true" aria-controls="collapsePages">
                <i className="fas fa-fw fa-folder"></i>
                <span>Pages</span><i className="fas fa-angle-down"></i>
            </button>
            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-bs-parent="#accordionSidebar">
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Login Screens:</h6>
                    <a className="collapse-item" href="login.html">Login</a>
                    <a className="collapse-item" href="register.html">Register</a>
                    <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                    <div className="collapse-divider"></div>
                    <h6 className="collapse-header">Other Pages:</h6>
                    <a className="collapse-item" href="404.html">404 Page</a>
                    <a className="collapse-item" href="blank.html">Blank Page</a>
                </div>
            </div>
        </li>

        <hr className="sidebar-divider d-none d-md-block"/>

        {/* <!-- Sidebar Toggler (Sidebar) --> */}
        <div className="text-center d-none d-md-inline">
          <button onClick={() => { clickMenuOpen() }} className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

        </ul>

    );
};

export default Sidebar;