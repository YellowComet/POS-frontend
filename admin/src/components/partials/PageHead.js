import React from 'react';
import  {Helmet} from 'react-helmet';

const PageHead = (props) => {
    return (
        <>
            <Helmet>
                <title>{props.pageTitle}</title>
            </Helmet>
            {/* <!-- Page Heading --> */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">{props.title}</h1>
                <h2 className="h4 mb-0 text-gray-700">{props.title2}</h2>
            </div>
        </>
    );
};

export default PageHead;