import React, {useState} from "react";
import Modal from 'react-bootstrap/Modal';

const DiscountModal = (props) => {

    const [input, setInput] = useState({});

    const handleInput = (e) => {
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const functionHandler = () => {
        if (input['descuentoPercent'] !== undefined){ 
            props.sendDataPercent(input['descuentoPercent']);
        }else{
            props.sendDataPercent(0);
        }
        if (input['descuentoNum'] !== undefined){
            props.sendDataNum(input['descuentoNum'])
        } else{
            props.sendDataNum(0)
        }
    }

    return (
        <>
            <Modal
                {...props}
                size={props.size}
                aria-labelledby="category_details_modal"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="category_details_modal" className="text-center">
                        {props.tittle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <label className="w-100 mt-1">
                            <p className="text-center">Descuento (%)</p>
                            <input
                                className={'form-control mt-2 text-center'}
                                type={'number'}
                                name={'descuentoPercent'}
                                value={input.descuentoPercent}
                                onChange={handleInput}
                                placeholder={'Enter Discount (%)'}
                            />
                        </label>
                    </div>
                    <div className="col-md-6">
                    <label className="w-100 mt-1">
                            <p className="text-center">Descuento  (€)</p>
                            <input
                                className={'form-control mt-2 text-center'}
                                type={'number'}
                                name={'descuentoNum'}
                                value={input.descuentoNum}
                                onChange={handleInput}
                                // defaultValue={0}
                                placeholder={'Enter Discount (€)'}
                            />
                        </label>
                    </div>
                </div>     
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={functionHandler} type="button"  >Save Discount</button>
                </Modal.Footer>
        </Modal>
    </>
    );
};

export default DiscountModal;