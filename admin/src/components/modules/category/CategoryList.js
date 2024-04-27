import React from 'react';
import PageHead from '../../partials/PageHead';
import CardHeader from "../../partials/miniComponent/CardHeader";

const CategoryList = () => {
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
                                <table className={'table table-hover table-striped table-bordered'}>
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Serial</th>
                                            <th>Status</th>
                                            <th>Created By</th>
                                            <th>Created At</th>
                                            <th>Updated At</th>
                                        </tr>
                                    </thead>
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