import React from "react";
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const CategoryDetailsModal = (props) => {

    const { t } = useTranslation();

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
                        {props.tittle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className={'my-table table table-hover table-striped table-bordered'}>
                        <tbody>
                            <tr>
                                <th>{t("categorydetails-id")}</th>
                                <td>{props.category.id}</td>
                            </tr>
                            <tr>
                                <th>{t("category-name")}</th>
                                <td>{props.category.name}</td>
                            </tr>
                            <tr>
                                <th>{t("category-slug")}</th>
                                <td>{props.category.slug}</td>
                            </tr>
                            {props.category.category_name !== undefined ?
                                <tr>
                                    <th>{t("categorydetails-category")}</th>
                                    <td>{props.category.category_name}</td>
                                </tr> : null
                            } 
                            <tr>
                                <th>{t("category-description")}</th>
                                <td>{props.category.description}</td>
                            </tr>
                            <tr>
                                <th>{t("category-serial")}</th>
                                <td>{props.category.serial}</td>
                            </tr>
                            <tr>
                                <th>{t("category-status")}</th>
                                <td>{props.category.status}</td>
                            </tr>
                            <tr>
                                <th>{t("categorylist-createdby")}</th>
                                <td>{props.category.created_by}</td>
                            </tr>
                            <tr>
                                <th>{t("categorylist-createdat")}</th>
                                <td>{props.category.created_at}</td>
                            </tr>
                            <tr>
                                <th>{t("categorylist-updated")}</th>
                                <td>{props.category.updated_at}</td>
                            </tr>
                            <tr>
                                <th>{t("category-photo")}</th>
                                <td><img src={props.category.photo} className={'img-thumbnail'} alt={'Category'}/></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
        </Modal>
    </>
    );
};

export default CategoryDetailsModal;