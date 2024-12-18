import React from "react";
import Modal from 'react-bootstrap/Modal';

const CategoryPhotoModal = (props) => {
    return (
        <>
            <Modal
                {...props}
                size={props.size}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.tittle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.photo} className={'img-thumbnail'} alt={'Category'}/>
                </Modal.Body>
        </Modal>
    </>
    );
};

export default CategoryPhotoModal;