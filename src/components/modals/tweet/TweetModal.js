import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Close } from '../../../utils/icons';
import { toast } from 'react-toastify';
import { addTweetAPI } from '../../../api/tweet';
import classnames from 'classnames';
import './tweetModal.scss';

const TweetModal = ({ showModal, setShowModal }) => {
    const [message, setMessage] = useState('');
    const maxLength = 280;

    const handleSubmit = event => {
        event.preventDefault();

        if (message.length > 0 && message.length <= maxLength) {
            addTweetAPI(message).then(response => {
                if (response?.code >= 200 && response?.code < 300) {
                    toast.success(`🚀 ${response.message}!`);
                    setShowModal(false);
                    window.location.reload();
                } else {
                    toast.error(`❌ Error del servidor, inténtelo más tarde.`);
                }
            }).catch(() => {
                toast.error(`❌ Error del servidor, inténtelo más tarde.`);
            });
        }
    }

    return (
        <Modal
            className="tweet-modal"
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Close onClick={() => setShowModal(false)} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control as="textarea" rows="6" placeholder="¿Qué estás pensando?" onChange={event => setMessage(event.target.value)} />
                    <span className={classnames('count', { error: message.length > maxLength })}>{message.length}</span>
                    <Button type="submit" disabled={message.length < 1 || message.length > maxLength}>Publicar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default TweetModal;