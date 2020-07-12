import React from 'react';
import { Modal } from 'react-bootstrap';
import { Close } from '../../../utils/icons';
import './configModal.scss';

const ConfigModal = ({ show, setShowModal, title, children }) => {
    return (
        <Modal
            className="config-modal"
            show={show}
            onHide={() => setShowModal(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={() => setShowModal(false)} />
                    <h2>{title}</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
}

export default ConfigModal;