import React from "react";
import PageHead from "../partials/PageHead";

const Error500 = () => {
    return (
        <>
        <PageHead title={'Error 500'} title2={''} pageTitle={'Error 500'}/>
        <div id="wrapper">
            <div class="container-fluid">
                <div class="text-center">
                    <div class="error mx-auto" data-text="404">404</div>
                    <p class="lead text-gray-800 mb-5">Page Not Found</p>
                    <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                    <a href="index.html">&larr; Back to Dashboard</a>
                </div>
            </div>
        </div>
        </>
    );
};

export default Error500;