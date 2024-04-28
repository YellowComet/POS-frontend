import React from "react";
import Modal from 'react-bootstrap/Modal';

const CategoryDetailsModal = (props) => {
    return (
        <>
            <Modal
                {...props}
                size={props.size}
                aria-labelledby="category_details_modal"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="category_details_modal">
                        <table className={'my-table table table-hover table-striped table-bordered'}>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{props.category.id}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.photo} className={'img-thumbnail'} alt={'Category'}/>
                </Modal.Body>
        </Modal>
    </>
    );
};

export default CategoryDetailsModal;