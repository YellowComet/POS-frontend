import React from 'react';
import PageHead from '../partials/PageHead';
import { useTranslation } from 'react-i18next';
import CardHeader from "../partials/miniComponent/CardHeader";

const BarCode = () => {
    const { t } = useTranslation();

    return (
        <>
        <PageHead title={t("barcode-tittle")} title2={t("barcode-tittle2")} pageTitle={t("barcode-head")}/>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                        <CardHeader 
                            title={t("barcode-tittle2")}
                            link={'/'}
                            icon={''}
                            button_text={''}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )

};

export default BarCode